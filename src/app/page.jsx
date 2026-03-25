import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import ServiceAreas from '../components/ServiceAreas'
import WhyAKT from '../components/WhyAKT'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import About from '../components/About'
import ContactForm from '../components/ContactForm'
import FinalCTA from '../components/FinalCTA'
import AdminController from '../components/AdminController'
import FloatingCallButton from '../components/FloatingCallButton'

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-charcoal font-body">
      <Navbar />
      <Hero />
      <Services />
      <ServiceAreas />
      <WhyAKT />
      <Portfolio />
      <Testimonials />
      <About />
      <ContactForm />
      <FinalCTA />
      <AdminController />
      <FloatingCallButton />
    </div>
  )
}
