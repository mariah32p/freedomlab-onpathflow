import React from 'react';
import Header from '../components/Header';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Landing page content will go here */}
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center">Welcome to OnPathFlow</h1>
          <p className="text-xl text-center mt-4">Visual Goal Path Builder</p>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;