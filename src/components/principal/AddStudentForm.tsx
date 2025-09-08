import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
import { generateNextUserId, generatePassword } from '@/data/dummyData';
import { StudentClass, Department } from '@/types/school';

interface AddStudentFormProps {
  schoolId: string;
  onSubmit: (studentData: any) => void;
  onCancel: () => void;
}

const studentClasses: StudentClass[] = [
  'JSS1A', 'JSS1B', 'JSS1C',
  'JSS2A', 'JSS2B', 'JSS2C',
  'JSS3A', 'JSS3B', 'JSS3C',
  'SS1A', 'SS1B', 'SS1C',
  'SS2A', 'SS2B', 'SS2C',
  'SS3A', 'SS3B', 'SS3C'
];

const departments: Department[] = ['Science', 'Art', 'Commercial'];

export default function AddStudentForm({ schoolId, onSubmit, onCancel }: AddStudentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentClass: '' as StudentClass,
    department: '' as Department,
    userId: generateNextUserId(schoolId, 'student'),
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate password if not provided
    const studentNumber = parseInt(formData.userId.split('/')[2]);
    const finalPassword = formData.password || generatePassword('student', studentNumber);
    
    const studentData = {
      ...formData,
      password: finalPassword,
      schoolId,
      role: 'student'
    };
    
    onSubmit(studentData);
  };

  const needsDepartment = formData.studentClass.startsWith('SS');

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-primary" />
          Add New Student
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
                placeholder="e.g., John Adebayo"
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
                placeholder="john.adebayo@student.school.edu.ng"
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
                Leave empty to auto-generate: Student@{formData.userId.split('/')[2]}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Select
                value={formData.studentClass}
                onValueChange={(value) => {
                  setFormData(prev => ({ 
                    ...prev, 
                    studentClass: value as StudentClass,
                    // Reset department if moving from SS to JSS
                    department: value.startsWith('JSS') ? '' as Department : prev.department
                  }));
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {studentClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {needsDepartment && (
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, department: value as Department }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Add Student
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