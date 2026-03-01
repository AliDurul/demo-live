import { SignInForm } from '@/components/SignInForm'
import React from 'react'

export default function SignIn() {
  return (
    <div
      className="min-h-svh flex flex-col items-center justify-center p-6 bg-cover bg-center bg-no-repeat bg-background/70 dark:bg-background/10  "
      style={{ backgroundImage: "url('/auth-bg.png')" }}
    >
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignInForm />
      </div>
    </div>
  )
}
