'use client';
import React, { useState } from 'react';
import { MessageSquare, ArrowRight, Play, Check, Star } from 'lucide-react';

function Home() {
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-blue-600 text-2xl font-bold hover-lift">mock.dev</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5">About</a>
              <a href="#practices" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5">Practices</a>
            </div>
            <a className="bg-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg pulse-on-hover">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80" 
            alt="Team collaboration" 
            className="w-full h-full object-cover transition-transform duration-10000 scale-100 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/50"></div>
        </div>
        <div className="relative pt-24 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl text-white animate-stagger">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ace Your Tech Interviews
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Practice with senior developers from top tech companies
            </p>
            <a className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg group">
              Start Practicing Nowiiiiiii
              <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* About Section with Video */}
      <div id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-stagger">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <p className="text-gray-600 mb-8">
                Get real interview experience with our platform. Practice with experienced developers who have worked at top tech companies.
              </p>
              <div className="space-y-4">
                {[
                  "1-on-1 mock interviews with senior developers",
                  "Detailed feedback and improvement areas",
                  "Technical and behavioral interview practice",
                  "Personalized interview preparation plan"
                ].map((item, index) => (
                  <div key={index} className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div 
              className="relative group cursor-pointer transform transition-all duration-500"
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              <img 
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80" 
                alt="Mock Interview Session" 
                className="rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${isVideoHovered ? 'scale-110 shadow-2xl' : ''}`}>
                  <Play className={`w-6 h-6 text-blue-600 ml-1 transition-transform duration-500 ${isVideoHovered ? 'scale-110' : ''}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Types Section */}
      <div id="practices" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Interview Practice Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Technical Interview",
                description: "Data structures, algorithms, and system design",
                duration: "60 min",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
                features: [
                  "Live coding practice",
                  "System design discussion",
                  "Code review feedback",
                  "Performance evaluation"
                ]
              },
              {
                title: "Behavioral Interview",
                description: "Leadership, teamwork, and problem-solving scenarios",
                duration: "45 min",
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80",
                features: [
                  "STAR method practice",
                  "Common scenario handling",
                  "Communication feedback",
                  "Body language tips"
                ]
              },
              {
                title: "Full Interview Prep",
                description: "Complete interview simulation with both rounds",
                duration: "90 min",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
                features: [
                  "Technical assessment",
                  "Behavioral evaluation",
                  "Detailed feedback report",
                  "Improvement roadmap"
                ]
              }
            ].map((practice, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={practice.image} 
                    alt={practice.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3 transition-transform duration-300 hover:rotate-12">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">{practice.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{practice.description}</p>
                  <div className="mb-4 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm font-medium">Duration: {practice.duration}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {practice.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 group">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 transition-transform duration-300 group-hover:scale-150"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div className="w-full px-4 py-2 bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg flex items-center justify-center group">
            Try it
                      <ArrowRight className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
   
       </div>
    </div>
  );
}

export default Home;
