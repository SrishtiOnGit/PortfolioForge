import React from 'react'
import '../styles/features.css'

const Features = () => {
  const features = [
    {id: 1, title: "Live Preview", description: "Get live preview before exporting the portfolio"},
    {id: 2, title: "Export Portfolio", description: "Export your portfolio in a pdf format"},
    {id: 3, title: "Beautiful Themes", description: "Choose from a wide range of themes"},
  ]
  return (
    <div className='features'>
      <h1 className='features-title'>Why PortfolioForge?</h1>
      <div className='features-grid'>
      {features.map(feature => (
        <div key={feature.id}>
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Features