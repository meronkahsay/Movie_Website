"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../sharedcomponent/Button';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import Footer from '../sharedcomponent/Footer';
import NavBar from '../sharedcomponent/NavBar';

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/signin');
  };

  const handleGoogleSignUp = () => {
 
    alert('Google sign-up to be implemented');
  };

  const handleButtonClick = () => {

    const syntheticEvent = new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent;
    handleSubmit(syntheticEvent);
  };

  return (
    <div>
      <NavBar onSearch={() => {}} />
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="bg-[url('/image/movie.jpg')] bg-no-repeat bg-cover w-110 h-132 shadow-lg hidden md:block"></div>
        <div className="bg-gray-800 p-8 rounded-lg text-white w-full max-w-md">
          <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
          <p className="mb-5">Enter your details below</p>
          <form onSubmit={handleSubmit} className="py-5">
            <input
              type="text"
              placeholder="Name"
              className="border-b px-2 py-2 mb-5 w-full bg-transparent text-white focus:border-yellow-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="border-b px-2 py-2 mb-5 w-full bg-transparent text-white focus:border-yellow-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b px-2 py-2 mb-5 w-full bg-transparent text-white focus:border-yellow-500 focus:outline-none"
            />
            <Button
              text="Create an account"
              classname="w-full"
              onClick={handleButtonClick}
              variant="filled"
            />
            <Button
              text="Sign up with Google"
              classname="w-full mt-3"
              onClick={handleGoogleSignUp}
              variant="outlined"
            >
              <FcGoogle className="inline mr-2 text-2xl" /> Sign up with Google
            </Button>
          </form>
          <p className="mt-5 text-center">
            Already have an account?{' '}
            <Link href="/signin" className="text-yellow-500 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;