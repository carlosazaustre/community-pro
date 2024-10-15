'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Avatar } from '@/shared/components/ui/avatar';
import LogoutButton from '@/auth/components/LogoutButton';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-yellow-400">
                <Link href="/">Community-Pro</Link>
              </span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500">
              Comunidad
            </a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500">
              Miembros
            </a>
            {session ? (
              <>
                <Button variant="ghost" size="icon" className="ml-3">
                  <Bell size={20} />
                </Button>
                <div className="ml-3 relative">
                  <Avatar className="h-8 w-8">
                    <Image
                      width={32}
                      height={32}
                      src={`https://avatar.vercel.sh/${session.user.username}`}
                      alt={session.user.username}
                      className="rounded-full"
                      objectFit="cover"
                    />
                  </Avatar>
                </div>
                <LogoutButton variant="icon" />
              </>
            ) : (
              <div className="ml-3 flex items-center">
                <Link href="/auth/signin">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="ml-2">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
            >
              Comunidad
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
            >
              Miembros
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {session ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar>
                      <Image
                        width={40}
                        height={40}
                        src={`https://avatar.vercel.sh/${session.user.username}`}
                        alt={session.user.username}
                      />
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{session.user.username}</div>
                    <div className="text-sm font-medium text-gray-500">{session.user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1">
                <Link href="/auth/signin">
                  <Button variant="ghost" className="w-full justify-center">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="w-full justify-center">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
