import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LogoutButton({ variant = 'text' }: { variant?: 'icon' | 'text' }) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (variant === 'icon') {
    return (
      <Button onClick={handleLogout} variant="ghost" className="ml-3">
        <LogOut size={15} />
      </Button>
    );
  }

  return (
    <Button onClick={handleLogout} variant="secondary" className="ml-3">
      Log out
    </Button>
  );
}
