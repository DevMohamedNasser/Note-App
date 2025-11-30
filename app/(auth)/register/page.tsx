import RegisterForm from '@/src/components/forms/RegisterForm'
import React from 'react'

export default function RegisterPage() {
  return (
    <div className="w-10/12 md:w-3/4 mx-auto pb-4">
      <h1 className='text-4xl mt-7 mb-3 text-center'>Register Now...</h1>
      <RegisterForm />
    </div>
  )
}
