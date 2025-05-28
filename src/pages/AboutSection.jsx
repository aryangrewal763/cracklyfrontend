import React from 'react'
import { ArrowRight, Code, Users, Calendar } from 'lucide-react'

export default function AboutSection() {
  return (
    <section className="bg-gradient-to-b from-blue-100 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
          About Crackly
        </h2>
        
        <p className="text-xl text-gray-700 mb-12 text-center">
        At Crackly, we empower you to ace your interviews with confidence. From personalized mock interviews and AI-powered feedback to expert tips and industry-specific resources, we provide everything you need to prepare smarter and perform better. Whether you're tackling technical challenges, behavioral questions, or case studies, Crackly is your go-to platform for turning interview anxiety into success.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FeatureCard 
            icon={<Code className="w-8 h-8 text-blue-600" />}
            title="About Crackly"
            description="Crackly is your ultimate interview preparation platform."
          />
          <FeatureCard 
            icon={<Users className="w-8 h-8 text-blue-600" />}
            title="Who Are we"
            description="Crackly is built to help you succeed in your job interview."
          />
          <FeatureCard 
            icon={<Calendar className="w-8 h-8 text-blue-600" />}
            title="Our Mission"
            description="Crackly is on a mission to make interview preparation accessible, effective, and enjoyable."
          />
        </div>
        
        <div className="text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-purple-700 transition duration-150 ease-in-out"
          >
            Explore Our Platform
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  )
}