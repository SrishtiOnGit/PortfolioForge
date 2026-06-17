import React, { useState } from 'react'
import '../styles/faq.css'
import Navbar from '/src/components/Navbar'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Is PortfolioForge really free?",
      answer: "Yes! Building, customizing templates, and exporting your digital portfolio as a print-ready PDF resume is completely free."
    },
    {
      question: "How does the PDF export feature work?",
      answer: "When you click 'Export Portfolio', our system converts your layout data into a professionally formatted single-page or multi-page PDF document optimized for recruiter tracking systems (ATS)."
    },
    {
      question: "Can I connect my GitHub profile directly?",
      answer: "Absolutely! You can import your top repositories, languages, and profile bio in just one click to speed up your setup process."
    },
    {
      question: "Are the templates optimized for mobile devices?",
      answer: "Yes, every template is fully responsive and beautifully styled to look amazing on smartphones, tablets, and desktop monitors alike."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <Navbar />
      <h1 className="faq-title">Frequently Asked Questions</h1>
      
      <div className="faq-wrapper">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question-row">
              <h3 className="faq-question">{item.question}</h3>
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            
            <div className="faq-answer-container">
              <p className="faq-answer">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ