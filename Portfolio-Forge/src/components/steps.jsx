import React from 'react'
import '../styles/steps.css'

const Steps = () => {
    const steps = [
        {id: 1, title: "Fill Your Details", description: "Input your experience, project details, and social links into our clean editor interface."},
        {id: 2, title: "Select a Template", description: "Browse through modern, developer-centric styles and pick the theme that fits your vibe."},
        {id: 3, title: "Live Preview", description: "Watch your portfolio assemble instantly in real-time, exactly how recruiters will see it."},
        {id: 4, title: "Export Portfolio", description: "Export your portfolio in a pdf format and share it with recruiters."}
    ]
  return (
    <div className='steps'>
        <h1 className='steps-title'>Steps to Start</h1>
        <div className='steps-grid'>
        {steps.map(step => (
            <div key={step.id}>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Steps