import React from 'react';
import Header from '../components/Header';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Signup page content will go here */}
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center">Sign Up</h1>
          <p className="text-xl text-center mt-4">Create your account</p>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;