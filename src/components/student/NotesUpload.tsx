import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NotesUploadProps {
  studentId: string;
  schoolId: string;
  onUploadComplete: () => void;
}

export const NotesUpload = ({ studentId, schoolId, onUploadComplete }: NotesUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a PDF smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload to storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('student-notes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create database record
      const { data: noteData, error: insertError } = await supabase
        .from('student_notes')
        .insert({
          student_id: studentId,
          school_id: schoolId,
          title: file.name.replace('.pdf', ''),
          file_path: fileName,
          file_size: file.size,
          processing_status: 'pending',
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast({
        title: "Upload successful",
        description: "Processing your notes to generate flashcards and quiz...",
      });

      setUploading(false);
      setProcessing(true);

      // Process the note
      const { error: processError } = await supabase.functions.invoke('process-note', {
        body: { noteId: noteData.id }
      });

      if (processError) {
        console.error('Processing error:', processError);
        toast({
          title: "Processing started",
          description: "Your notes are being processed. Refresh in a moment to see results.",
        });
      } else {
        toast({
          title: "Processing complete!",
          description: "Your flashcards and quiz are ready",
        });
      }

      setProcessing(false);
      onUploadComplete();
      
      // Reset input
      event.target.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
      setUploading(false);
      setProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload PDF Notes</CardTitle>
        <CardDescription>
          Upload your study notes as a PDF and we'll automatically generate flashcards and quizzes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            disabled={uploading || processing}
            className="cursor-pointer"
          />
          {(uploading || processing) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{uploading ? 'Uploading...' : 'Processing...'}</span>
            </div>
          )}
        </div>
        {!uploading && !processing && (
          <p className="text-xs text-muted-foreground mt-2">
            Max file size: 10MB • Only PDF files accepted
          </p>
        )}
      </CardContent>
    </Card>
  );
};