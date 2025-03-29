import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="text-center p-10">
        <h1 className="text-4xl font-extrabold mb-4">
          Connect with Developers
        </h1>
        <p className="text-lg text-gray-300">
          Build your profile, showcase your skills, and collaborate on projects.
        </p>
        <Link
          to="/register"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 rounded-full text-lg font-semibold hover:bg-blue-600 transition"
        >
          Join Now
        </Link>
      </header>

      {/* Features Section */}
      <section className="p-10">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Why Join Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold">👥 Connect</h3>
            <p className="text-gray-400">Meet developers worldwide.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold">💼 Build Profile</h3>
            <p className="text-gray-400">Showcase your skills & projects.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold">🚀 Collaborate</h3>
            <p className="text-gray-400">Work on open-source projects.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center my-10">
        <h2 className="text-2xl font-bold">Start Your Journey Now!</h2>
        <Link
          to="/signup"
          className="mt-4 inline-block px-6 py-3 bg-green-500 rounded-full text-lg font-semibold hover:bg-green-600 transition"
        >
          Sign Up Free
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
