import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyAKT from './components/WhyAKT'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import About from './components/About'
import ContactForm from './components/ContactForm'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import FloatingCallButton from './components/FloatingCallButton'
import AdminPanel from './components/AdminPanel'

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-charcoal font-body">
      <Navbar />
      <Hero />
      <Services />
      <WhyAKT />
      <Portfolio />
      <Testimonials />
      <About />
      <ContactForm />
      <FinalCTA />
      <Footer onAdminClick={() => setAdminOpen(true)} />
      <FloatingCallButton />
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  )
}
