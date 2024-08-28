import Head from "next/head";
import Link from "next/link";
import Brand from "@/components/ui/Brand";
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up - Mailgo</title>
      </Head>
      <main className='w-full h-screen flex flex-col items-center justify-center px-4'>
        <div className='max-w-sm w-full text-gray-300'>
          <div className='text-center'>
            <Brand className='mx-auto w-32' />
            <div className='mt-5 space-y-2'>
              <h1 className='text-white text-2xl font-bold sm:text-3xl'>
                Create your account
              </h1>
              <p className=''>
                Already have an account?{" "}
                <Link
                  href='/sign-in'
                  className='font-medium text-purple-500 hover:text-purple-600 duration-150'>
                  Log in
                </Link>
              </p>
            </div>
          </div>
          <div className='mt-8'>
            {/* Clerk SignUp component */}
            <SignUp />
          </div>
        </div>
      </main>
    </>
  );
}
