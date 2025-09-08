import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, UserPlus } from 'lucide-react';
import { generateNextUserId, generatePassword } from '@/data/dummyData';

interface AddTeacherFormProps {
  schoolId: string;
  onSubmit: (teacherData: any) => void;
  onCancel: () => void;
}

export default function AddTeacherForm({ schoolId, onSubmit, onCancel }: AddTeacherFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subjects: [] as string[],
    userId: generateNextUserId(schoolId, 'teacher'),
    password: ''
  });
  const [currentSubject, setCurrentSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate password if not provided
    const teacherNumber = parseInt(formData.userId.split('/')[2]);
    const finalPassword = formData.password || generatePassword('teacher', teacherNumber);
    
    const teacherData = {
      ...formData,
      password: finalPassword,
      schoolId,
      role: 'teacher'
    };
    
    onSubmit(teacherData);
  };

  const addSubject = () => {
    if (currentSubject.trim() && !formData.subjects.includes(currentSubject.trim())) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, currentSubject.trim()]
      }));
      setCurrentSubject('');
    }
  };

  const removeSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-primary" />
          Add New Teacher
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Mrs. Sarah Johnson"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="sarah.johnson@school.edu.ng"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userId">Username (Auto-generated)</Label>
              <Input
                id="userId"
                value={formData.userId}
                readOnly
                className="bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password (Optional)</Label>
              <Input
                id="password"
                type="text"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Auto-generated if empty"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to auto-generate: Teacher@{formData.userId.split('/')[2]}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects Taught</Label>
            <div className="flex gap-2">
              <Input
                id="subjects"
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                placeholder="Enter subject name"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
              />
              <Button type="button" onClick={addSubject} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {formData.subjects.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary" className="gap-1">
                    {subject}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeSubject(subject)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Add Teacher
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}