import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/school';
import { GraduationCap, BookOpen, Shield } from 'lucide-react';

interface LoginCardProps {
  role: UserRole;
  onLogin: (role: UserRole, credentials: { schoolId: string; password: string }) => void;
}

const roleConfig = {
  student: {
    icon: GraduationCap,
    title: 'Student Portal',
    description: 'Access your dashboard, view rankings, and earn points',
    placeholder: 'Enter your School ID (e.g., BP/2024/001)',
    buttonText: 'Access Student Portal',
    gradient: 'bg-gradient-primary',
  },
  teacher: {
    icon: BookOpen,
    title: 'Teacher Portal',
    description: 'Manage assignments, award points, and track student progress',
    placeholder: 'Enter your Staff ID (e.g., BP/STAFF/001)',
    buttonText: 'Access Teacher Portal',
    gradient: 'bg-gradient-accent',
  },
  principal: {
    icon: Shield,
    title: 'Principal Portal',
    description: 'School administration, analytics, and system management',
    placeholder: 'Enter your Admin ID (e.g., BP/ADMIN/001)',
    buttonText: 'Access Admin Portal',
    gradient: 'bg-secondary',
  },
};

export default function LoginCard({ role, onLogin }: LoginCardProps) {
  const [schoolId, setSchoolId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const config = roleConfig[role];
  const Icon = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(role, { schoolId, password });
      setIsLoading(false);
    }, 1000);
  };

  // Demo credentials helper
  const getDemoCredentials = () => {
    switch (role) {
      case 'student':
        return 'BP/2024/001';
      case 'teacher':
        return 'BP/STAFF/001';
      case 'principal':
        return 'BP/ADMIN/001';
      default:
        return '';
    }
  };

  const fillDemoCredentials = () => {
    setSchoolId(getDemoCredentials());
    setPassword('demo123');
  };

  return (
    <Card className="w-full max-w-md hover-lift shadow-card">
      <CardHeader className="text-center space-y-4">
        <div className={`w-16 h-16 mx-auto rounded-2xl ${config.gradient} flex items-center justify-center shadow-glow`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold">{config.title}</CardTitle>
          <CardDescription className="mt-2">{config.description}</CardDescription>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="floating-input">
            <input
              id={`${role}-id`}
              type="text"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              placeholder=" "
              required
              className="peer"
            />
            <label htmlFor={`${role}-id`}>
              School ID
            </label>
          </div>

          <div className="floating-input">
            <input
              id={`${role}-password`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
              className="peer"
            />
            <label htmlFor={`${role}-password`}>
              Password
            </label>
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full font-semibold hover-glow"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : config.buttonText}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full text-sm"
              onClick={fillDemoCredentials}
            >
              Use Demo Credentials ({getDemoCredentials()})
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Demo mode: Use the button above to auto-fill credentials
          </p>
        </form>
      </CardContent>
    </Card>
  );
}