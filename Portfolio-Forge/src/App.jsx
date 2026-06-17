import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'; // 👈 Removed 'Router' from here
import About from './components/About';
import Features from './components/Features';
import Hero from './components/hero';
import Steps from './components/steps';
import FAQ from './components/faq';
import Dashboard from './components/dashboard';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <hr className="section-divider" />
      <Features />
      <hr className="section-divider" />
      <Steps />
      <hr className="section-divider" />
      <footer className="footer">
        <p>Made with ❤️ by <a href="https://github.com/SrishtiOnGit">Srishti</a></p>
      </footer>
    </>
  )
}

function App() {
  return (
    /* 👈 Removed the duplicate <Router> tags from here */
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/About" element={<About />} />
      <Route path="/Features" element={<Features />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App