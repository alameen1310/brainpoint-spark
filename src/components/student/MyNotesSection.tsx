import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NotesUpload } from "./NotesUpload";
import { FlashcardViewer } from "./FlashcardViewer";
import { QuizViewer } from "./QuizViewer";

interface StudentNote {
  id: string;
  title: string;
  processing_status: string;
  error_message: string | null;
  created_at: string;
}

interface MyNotesSectionProps {
  studentId: string;
  schoolId: string;
}

export const MyNotesSection = ({ studentId, schoolId }: MyNotesSectionProps) => {
  const [notes, setNotes] = useState<StudentNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<StudentNote | null>(null);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('student_notes')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
      toast({
        title: "Error loading notes",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setNotes(data || []);
      if (data && data.length > 0 && !selectedNote) {
        setSelectedNote(data[0]);
      }
    }
    setLoading(false);
  };

  const fetchFlashcardsAndQuiz = async (noteId: string) => {
    // Fetch flashcards
    const { data: flashcardsData, error: flashcardsError } = await supabase
      .from('flashcards')
      .select('*')
      .eq('note_id', noteId)
      .order('created_at', { ascending: true });

    if (flashcardsError) {
      console.error('Error fetching flashcards:', flashcardsError);
    } else {
      setFlashcards(flashcardsData || []);
    }

    // Fetch quiz and questions
    const { data: quizData, error: quizError } = await supabase
      .from('quizzes')
      .select(`
        *,
        quiz_questions (*)
      `)
      .eq('note_id', noteId)
      .single();

    if (quizError) {
      console.error('Error fetching quiz:', quizError);
      setQuiz(null);
    } else {
      setQuiz({
        ...quizData,
        questions: quizData.quiz_questions || []
      });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [studentId]);

  useEffect(() => {
    if (selectedNote?.id) {
      fetchFlashcardsAndQuiz(selectedNote.id);
    }
  }, [selectedNote]);

  const handleDeleteNote = async (noteId: string) => {
    const { error } = await supabase
      .from('student_notes')
      .delete()
      .eq('id', noteId);

    if (error) {
      toast({
        title: "Error deleting note",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully",
      });
      fetchNotes();
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Ready</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <NotesUpload 
        studentId={studentId} 
        schoolId={schoolId}
        onUploadComplete={fetchNotes}
      />

      {notes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">No notes yet</p>
            <p className="text-sm text-muted-foreground">
              Upload your first PDF to get started with AI-generated flashcards and quizzes
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Notes List */}
          <Card>
            <CardHeader>
              <CardTitle>My Notes</CardTitle>
              <CardDescription>Select a note to view flashcards and quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedNote?.id === note.id 
                      ? 'bg-primary/10 border-primary' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => setSelectedNote(note)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-medium text-sm truncate flex-1">{note.title}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    {getStatusBadge(note.processing_status)}
                    <p className="text-xs text-muted-foreground">
                      {new Date(note.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {note.error_message && (
                    <p className="text-xs text-red-500 mt-1">{note.error_message}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Flashcards and Quiz */}
          <div className="md:col-span-2">
            {selectedNote?.processing_status === 'completed' ? (
              <Tabs defaultValue="flashcards">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="flashcards">
                    Flashcards ({flashcards.length})
                  </TabsTrigger>
                  <TabsTrigger value="quiz">
                    Quiz {quiz ? `(${quiz.questions?.length || 0})` : ''}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="flashcards" className="mt-4">
                  <FlashcardViewer flashcards={flashcards} />
                </TabsContent>
                <TabsContent value="quiz" className="mt-4">
                  <QuizViewer quiz={quiz} />
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  {selectedNote?.processing_status === 'processing' && (
                    <>
                      <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-blue-500" />
                      <p className="text-lg font-medium mb-2">Processing your notes</p>
                      <p className="text-sm text-muted-foreground">
                        AI is generating flashcards and quiz questions. This may take a minute...
                      </p>
                    </>
                  )}
                  {selectedNote?.processing_status === 'failed' && (
                    <>
                      <p className="text-lg font-medium mb-2 text-red-500">Processing failed</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedNote.error_message || 'An error occurred while processing your notes'}
                      </p>
                    </>
                  )}
                  {selectedNote?.processing_status === 'pending' && (
                    <>
                      <p className="text-lg font-medium mb-2">Waiting to process</p>
                      <p className="text-sm text-muted-foreground">
                        Your note is in the queue and will be processed shortly
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};