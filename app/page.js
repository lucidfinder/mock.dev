"use client";

import { Play, Code,   ChevronRight,  } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";


import { useRef } from "react";
import Image from "next/image";
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const { isSignedIn } = useAuth();

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <main className="min-h-screen bg-white text-black">
{/* Header Section */}
<header className="w-full py-4 bg-white absolute top-0 left-0 z-10 shadow-md">
  <div className="container mx-auto px-4 flex items-center justify-between">
    <h1 className="text-2xl font-bold-text-black">Mock.<span className="text-blue-600">Dev</span></h1>
    <nav className="flex space-x-6">
      <a href="/interview" className="text-lg text-black hover:text-blue-400">AI Mock Interview</a>
      <a href="/resume" className="text-lg text-black hover:text-blue-400">AI Resume Analyzer</a>
      <a href="/practice" className="text-lg text-black hover:text-blue-400">Coding Practice</a>

    </nav>
    <div className="flex space-x-4">
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Button className="bg-blue-600" onClick={() => {
            window.location.href = "/sign-in";
          }}>
          Sign Up
        </Button>
      )}
    </div>
  </div>
</header>



{/* Hero Section */}
<section className="relative h-screen flex items-center justify-between bg-white px-4 py-32">
  <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between space-x-12">
    {/* Left Section: Image */}
    <div className="w-full lg:w-1/2 relative mb-12 lg:mb-0">
      <div></div>
      <img
        src="https://blush.design/api/download?shareUri=YCq0lEeMAMzm1Y7O&c=Clothing_0%7Eff4b33-0.1%7E02bad3&w=800&h=800&fm=png"
        alt="Tech Interview"
        
      />
    </div>

    {/* Right Section: Heading and Paragraph */}
    <div className="flex flex-col items-start lg:items-center lg:text-center space-y-6 w-full lg:w-1/2">
      <div className="flex items-center space-x-4">
        <Code className="w-12 h-12 text-blue-500 animate-bounce" />
        <h2 className="text-2xl font-bold ">Mock.<span className="text-blue-500">Dev</span></h2>
      </div>
      <h1 className="text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
        Ace Your Tech Interviews
      </h1>
      <p className="text-base lg:text-lg text-gray-700 mb-8 max-w-lg">
        Master your interview skills with our AI-powered platform. Get personalized feedback and real-world practice to land your dream job.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
        onClick={() => {
          window.location.href = "/sign-in";
        }}
      >
        Start Your Journey
      </motion.button>
    </div>
  </div>
</section>

<style jsx>
{`
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-bounce {
    animation: bounce 4s infinite;
  }

  .bg-clip-text {
    -webkit-background-clip: text;
    color: transparent;
  }
`}
</style>




{/* Services */}
<div>
  <section className="container mx-auto px-4 py-32 pb-26 pt-24 ">
    <div>
      <h2 className="text-5xl font-bold text-center mb-16 text-black">
        <span className="text-blue-600">Explore</span> Our Services
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80",
            title: "AI Mock Interviews",
            description: "Hone your skills with AI-driven mock interviews and receive instant, actionable feedback."
          },
          {
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
            title: "Real-World Challenges",
            description: "Tackle practical coding and system design problems in a realistic, simulated environment."
          },
          {
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80",
            title: "Expert Resume Reviews",
            description: "Elevate your resume with detailed feedback from industry experts and AI-powered analysis."
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="group relative transition-transform duration-300 hover:scale-105"
          >
            <div className="relative p-8 bg-white rounded-xl shadow-xl transition-all transform hover:shadow-2xl">
              <div className="relative mb-6 rounded-xl overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-cover w-full h-48 transition-transform group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">{feature.title}</h3>
              <p className="text-gray-700 mb-6">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
</div>





{/* About Section */}
<div id="about-us" className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white px-8 sm:px-16 lg:px-32 pb-19">
  {/* Left Side: About Card */}
  <div className="p-10 rounded-lg shadow-lg text-black max-w-2xl lg:w-1/2 lg:mr-12 mb-8 lg:mb-0">
    <h2 className="text-6xl font-bold mb-8 text-left">The
      <span className="text-blue-600"> Challenge</span> <span className="text-gray-800">.</span>
    </h2>
    <p className="text-gray-700 text-2xl mb-6 leading-relaxed">
      Succeeding in tech interviews requires more than just technical knowledge. It demands skill, confidence, and a compelling resume.
    </p>
  </div>
  
  {/* Right Side: Image */}
  <div className="lg:w-1/2 flex justify-center">
    <img
      src="/canbegood.jpeg"
      alt="Team Collaboration"
      className="w-full max-w-lg"
    />
  </div>
</div>

<style jsx>
{`
  .shadow-lg {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  }
  .shadow-2xl {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  .leading-relaxed {
    line-height: 1.75;
  }
`}
</style>

{/* About continuation */}
<div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white px-8 sm:px-16 lg:px-32 pt-19">
  {/* Left Side: Image */}
  <div className="lg:w-1/2 flex justify-center mb-12 lg:mb-0 lg:mr-14">
    <img
      src="/aboutus.jpeg"
      alt="Team Collaboration"
      className="w-full max-w-lg"
    />
  </div>
  
  {/* Right Side: About Card */}
  <div className="p-10 rounded-lg shadow-lg text-black max-w-2xl lg:w-1/2">
    <h2 className="text-6xl font-bold mb-8 text-left ">
      <span className="text-gray-800">That's where </span>Mock.<span className="text-blue-600">Dev</span><span className="text-gray-800"> comes in.</span>
    </h2>
    <p className="text-gray-700 text-2xl mb-6 leading-relaxed">
      We empower you with AI-driven tools and practice to succeed. Master interviews, tackle challenges, and refine your resume effectively with Mock.Dev.
      Transform your preparation into confidence and achieve your career goals.
    </p>
  </div>
</div>

<style jsx>
{`
  .shadow-lg {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  }
  .shadow-2xl {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  .leading-relaxed {
    line-height: 1.75;
  }
`}
</style>







 

{/* How it Works */}
<section className="container mx-auto px-4 py-32">
  <h2 className="text-5xl font-bold text-center mb-16 text-black">How It <span className="text-blue-600">works</span></h2>
  <div className="grid md:grid-cols-2 gap-16 items-center">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="aspect-video rounded-2xl overflow-hidden bg-white border border-blue-900/50 shadow-lg"
    >
      <div className="relative w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80"
          alt="Coding interview"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
          <Play className="w-20 h-20 text-blue-400" />
        </div>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-3xl font-bold mb-6 text-black">Interactive Learning Experience</h3>
      <p className="text-gray-700 mb-8 text-lg leading-relaxed">
        Watch expert-led tutorials and learn the strategies to ace your technical interviews. Our platform provides real-time feedback and personalized recommendations.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all mb-8"
      >
        Learn More <ChevronRight className="w-5 h-5 ml-2" />
      </motion.button>
    </motion.div>
  </div>
</section>


      



{/* Interactive FAQ */}
<section className="container mx-auto px-4 py-32">
  <h2 className="text-5xl font-bold text-center mb-16 text-black">Frequently Asked Questions</h2>
  <div className="space-y-8">
    {[
      { question: "How do I start a mock interview?", answer: "Simply sign up and select your desired interview type to get started." },
      { question: "What features are available on InterviewMaster?", answer: "We offer mock interviews, resume analysis, and real-time feedback from experts." },
      { question: "Can I get feedback on my resume?", answer: "Yes, we provide detailed feedback on resumes from industry professionals and AI tools." }
    ].map((item, index) => (
      <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full text-left text-xl font-semibold text-black mb-4 focus:outline-none hover:text-blue-500 transition-colors">
                <div className="flex items-center">
                  <span>{item.question}</span>
                  <ChevronDownIcon
                    className={`ml-2 w-5 h-5 text-black transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="text-lg text-gray-700">{item.answer}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    ))}
  </div>
</section>


     {/* Join Our Community */}
<section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
  <div className="container mx-auto text-center text-white px-4">
    <h3 className="text-4xl font-bold mb-6">
      Join Our Community <br />
      <span className="text-blue-300">We Build Your Confidence</span>
    </h3>
    <p className="text-lg mb-10">
      Become part of a supportive network where you can grow, learn, and excel. 
      Together, we help you achieve your goals and boost your self-assurance.
    </p>
    <button className="bg-white text-blue-800 px-8 py-4 rounded-full font-medium text-lg hover:bg-blue-100 transition-all shadow-lg hover:shadow-xl">
      Join Now
    </button>
  </div>
</section>

      {/* Footer */}
<footer className="bg-[#050505] mt-20 py-16 border-t border-blue-900/20 shadow-lg">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-12">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center text-white">
          <Code className="w-6 h-6 mr-2 text-blue-500" />
          Mock.Dev
        </h3>
        <p className="text-gray-400">Empowering developers to succeed in technical interviews.</p>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-4 text-white">Features</h4>
        <ul className="space-y-3 text-gray-400">
          <li>Mock Interviews</li>
          <li>Practical Interviews</li>
          <li>Resume Analysis</li>
          <li>Expert Feedback</li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-4 text-white">Company</h4>
        <ul className="space-y-3 text-gray-400">
          <li>About Us</li>
          <li>Careers</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-4 text-white">Legal</h4>
        <ul className="space-y-3 text-gray-400">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Cookie Policy</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-blue-900/20 mt-12 pt-8 text-center text-gray-400">
      <p>&copy; 2025 InterviewMaster. All rights reserved.</p>
    </div>
  </div>
</footer>

    </main>
  );
}
