import Head from "next/head";
import Link from "next/link";
import Brand from "@/components/ui/Brand";
import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Mailgo</title>
      </Head>
      <main className='w-full h-screen flex flex-col items-center justify-center px-4'>
        <div className='max-w-sm w-full text-gray-300'>
          <div className='text-center'>
            <Brand className='mx-auto w-32' />
            <div className='mt-5 space-y-2'>
              <h1 className='text-white text-2xl font-bold sm:text-3xl'>
                Log in to your account
              </h1>
              <p className=''>
                Don't have an account?{" "}
                <Link
                  href='/#pricing'
                  className='font-medium text-purple-500 hover:text-purple-600 duration-150'>
                  Get access
                </Link>
              </p>
            </div>
          </div>
          <div className='mt-8'>
            {/* Clerk SignIn component */}
            <SignIn />
          </div>
        </div>
      </main>
    </>
  );
}