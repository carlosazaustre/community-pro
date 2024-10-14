import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Button onClick={handleLogout} variant="ghost">
      <LogOut size={15} />
    </Button>
  );
}
