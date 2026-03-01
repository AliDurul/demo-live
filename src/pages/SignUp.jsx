import { SignUpForm } from '@/components/SignUpForm'
import React from 'react'

export default function SignUp() {
  return (
    <div
      className="min-h-svh flex flex-col items-center justify-center p-6bg-cover bg-center bg-no-repeat bg-background/70 dark:bg-background/10  "
      style={{ backgroundImage: "url('/auth-bg.png')" }}
    >
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignUpForm />
      </div>
    </div>
  )
}

