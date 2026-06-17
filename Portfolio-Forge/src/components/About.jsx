import React from 'react'
import '../styles/about.css'
import Navbar from '/src/components/Navbar'

const About = () => {
  return (
    <div className='about' >
      <Navbar />
      <div className='about-content'>
      <h1>Why we build PortfolioForge?</h1>
      <p>As developers, we want to spend our time writing clean code and building impactful projects—not wrestling with tedious CSS layouts just to show off our work or generate a clean resume.</p>
      </div>
      <div className='about-mission'>
        <h1>Our Mission</h1>
        <p>PortfolioForge was built to bridge that gap. It’s an instant, interactive workspace where your experience and GitHub profile transform into a stunning, recruiter-ready showcase with zero configuration</p>
      </div>
      <div className='about-vision'>
        <h1>Our Vision</h1>
        <p>At PortfolioForge, our mission is to empower developers to showcase their work in a way that recruiters and hiring managers can understand without any coding experience or design skills.</p>
      </div>

    </div>
  )
}

export default About