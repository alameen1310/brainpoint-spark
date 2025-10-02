import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";
import PDFParser from "npm:pdf-parse@1.1.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { noteId } = await req.json();
    
    if (!noteId) {
      throw new Error('Note ID is required');
    }

    console.log('Processing note:', noteId);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get note details
    const { data: note, error: noteError } = await supabase
      .from('student_notes')
      .select('*')
      .eq('id', noteId)
      .single();

    if (noteError || !note) {
      throw new Error('Note not found');
    }

    console.log('Found note:', note.title);

    // Update status to processing
    await supabase
      .from('student_notes')
      .update({ processing_status: 'processing' })
      .eq('id', noteId);

    // Download PDF from storage
    const { data: pdfData, error: downloadError } = await supabase
      .storage
      .from('student-notes')
      .download(note.file_path);

    if (downloadError || !pdfData) {
      throw new Error('Failed to download PDF');
    }

    console.log('Downloaded PDF, size:', pdfData.size);

    // Extract text from PDF
    const arrayBuffer = await pdfData.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    let pdfText = '';
    try {
      const pdfData = await PDFParser(buffer);
      pdfText = pdfData.text;
      console.log('Extracted text length:', pdfText.length);
    } catch (parseError) {
      console.error('PDF parsing error:', parseError);
      throw new Error('Failed to parse PDF. Make sure it\'s a valid PDF file.');
    }

    if (!pdfText || pdfText.trim().length < 50) {
      throw new Error('PDF appears to be empty, scanned, or image-based. Please upload a PDF with selectable text (not scanned images). Extracted text length: ' + pdfText.trim().length);
    }

    // Call Lovable AI to generate flashcards and quiz
    console.log('Calling AI to generate content...');
    
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are an educational assistant that creates study materials from student notes.'
          },
          {
            role: 'user',
            content: `Based on the following notes, generate:
1. 8-12 flashcards (question and answer pairs for key concepts)
2. A quiz with 5-10 multiple choice questions with 4 options each

Notes content:
${pdfText.slice(0, 15000)}

Return your response in this exact JSON format:
{
  "flashcards": [
    {"question": "...", "answer": "..."}
  ],
  "quiz": {
    "title": "Quiz on [topic]",
    "questions": [
      {
        "question": "...",
        "option_a": "...",
        "option_b": "...",
        "option_c": "...",
        "option_d": "...",
        "correct_answer": "a|b|c|d"
      }
    ]
  }
}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_study_materials",
              description: "Generate flashcards and quiz from notes",
              parameters: {
                type: "object",
                properties: {
                  flashcards: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        question: { type: "string" },
                        answer: { type: "string" }
                      },
                      required: ["question", "answer"]
                    }
                  },
                  quiz: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      questions: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            question: { type: "string" },
                            option_a: { type: "string" },
                            option_b: { type: "string" },
                            option_c: { type: "string" },
                            option_d: { type: "string" },
                            correct_answer: { type: "string" }
                          },
                          required: ["question", "option_a", "option_b", "option_c", "option_d", "correct_answer"]
                        }
                      }
                    },
                    required: ["title", "questions"]
                  }
                },
                required: ["flashcards", "quiz"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_study_materials" } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error('AI processing failed');
    }

    const aiData = await aiResponse.json();
    console.log('AI response received');

    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('AI did not return expected format');
    }

    const generatedContent = JSON.parse(toolCall.function.arguments);

    // Save flashcards
    const flashcardsToInsert = generatedContent.flashcards.map((fc: any) => ({
      note_id: noteId,
      student_id: note.student_id,
      question: fc.question,
      answer: fc.answer,
    }));

    const { error: flashcardsError } = await supabase
      .from('flashcards')
      .insert(flashcardsToInsert);

    if (flashcardsError) {
      console.error('Error saving flashcards:', flashcardsError);
      throw new Error('Failed to save flashcards');
    }

    console.log('Saved', flashcardsToInsert.length, 'flashcards');

    // Save quiz
    const { data: quizData, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        note_id: noteId,
        student_id: note.student_id,
        title: generatedContent.quiz.title,
      })
      .select()
      .single();

    if (quizError || !quizData) {
      console.error('Error saving quiz:', quizError);
      throw new Error('Failed to save quiz');
    }

    console.log('Created quiz:', quizData.id);

    // Save quiz questions
    const questionsToInsert = generatedContent.quiz.questions.map((q: any) => ({
      quiz_id: quizData.id,
      question: q.question,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_answer: q.correct_answer,
    }));

    const { error: questionsError } = await supabase
      .from('quiz_questions')
      .insert(questionsToInsert);

    if (questionsError) {
      console.error('Error saving questions:', questionsError);
      throw new Error('Failed to save quiz questions');
    }

    console.log('Saved', questionsToInsert.length, 'quiz questions');

    // Update note status to completed
    await supabase
      .from('student_notes')
      .update({ 
        processing_status: 'completed',
        error_message: null 
      })
      .eq('id', noteId);

    console.log('Processing completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        flashcards_count: flashcardsToInsert.length,
        quiz_questions_count: questionsToInsert.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing note:', error);

    // Try to update note with error status
    try {
      const requestBody = await req.clone().json();
      const { noteId } = requestBody;
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      await supabase
        .from('student_notes')
        .update({ 
          processing_status: 'failed',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        })
        .eq('id', noteId);
    } catch (updateError) {
      console.error('Failed to update error status:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});