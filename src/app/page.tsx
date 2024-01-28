import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center'>
      <div className='space-y-6 text-center'>
        <h1 className={cn('text-6xl font-semibold text-black drop-shadow-md', poppins.className)}>
          🔐 Auth
        </h1>
        <p className='text-black text-lg'>
          A simple authentication service
        </p>
        <div>
          <LoginButton>
            <Button variant='secondary' size='lg'>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
