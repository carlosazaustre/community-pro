'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyEmailContent() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams?.get('token');
      if (!token) {
        console.error('No token provided');
        setStatus('error');
        return;
      }

      try {
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams]);

  if (status === 'verifying') {
    return <div>Verifying your email...</div>;
  }

  if (status === 'success') {
    // TODO: Better UI
    return (
      <div>
        <h1>Email Verified Successfully</h1>
        <p>You can now log in to your account.</p>
        <button onClick={() => router.push('/auth/signin')}>Go to Login</button>
      </div>
    );
  }

  // TODO: Better UI
  return (
    <div>
      <h1>Verification Failed</h1>
      <p>There was an error verifying your email. Please try again or contact support.</p>
    </div>
  );
}

export default function VerifyEmailPage() {
  // TODO: better markup on fallback
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
