import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserMinus, AlertTriangle } from 'lucide-react';
import { DUMMY_USERS, DUMMY_TEACHERS, DUMMY_STUDENTS } from '@/data/dummyData';

interface RemoveUserFormProps {
  schoolId: string;
  userType: 'teacher' | 'student';
  onSubmit: (userId: string) => void;
  onCancel: () => void;
}

export default function RemoveUserForm({ schoolId, userType, onSubmit, onCancel }: RemoveUserFormProps) {
  const [selectedUserId, setSelectedUserId] = useState('');

  // Get users based on type and school
  const users = userType === 'teacher' 
    ? DUMMY_TEACHERS.filter(t => t.schoolId === schoolId).map(t => ({
        id: t.userId,
        name: t.user?.name || 'Unknown',
        details: `Subjects: ${t.subjects.join(', ')}`
      }))
    : DUMMY_STUDENTS.filter(s => s.schoolId === schoolId).map(s => ({
        id: s.userId,
        name: s.user?.name || 'Unknown',
        details: `${s.studentClass} • ${s.department}`
      }));

  const selectedUser = users.find(u => u.id === selectedUserId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId) {
      onSubmit(selectedUserId);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserMinus className="w-5 h-5 text-destructive" />
          Remove {userType === 'teacher' ? 'Teacher' : 'Student'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user">
              Select {userType === 'teacher' ? 'Teacher' : 'Student'} to Remove
            </Label>
            <Select
              value={selectedUserId}
              onValueChange={setSelectedUserId}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder={`Choose a ${userType}`} />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.details}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedUser && (
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription>
                <strong>Warning:</strong> You are about to remove{' '}
                <strong>{selectedUser.name}</strong> from the school system.{' '}
                {userType === 'teacher' && 'This will affect their assigned classes and students.'}{' '}
                {userType === 'student' && 'This will remove all their academic records and points.'}{' '}
                This action cannot be undone.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              variant="destructive" 
              className="flex-1"
              disabled={!selectedUserId}
            >
              Remove {userType === 'teacher' ? 'Teacher' : 'Student'}
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