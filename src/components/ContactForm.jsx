import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { CheckCircle, Phone } from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { COMPANY } from '../lib/constants'
import { saveContactLead } from '../lib/supabase'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: '',
  })
  const [phoneError, setPhoneError] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === 'phone') setPhoneError(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.phone.trim()) {
      setPhoneError(true)
      return
    }

    setSubmitting(true)

    // Save to Supabase for record-keeping
    await saveContactLead(form)

    // Send email notification to contractor
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name || 'Not provided',
          phone:        form.phone,
          from_email:   form.email || 'Not provided',
          project_type: form.projectType || 'Not specified',
          message:      form.message || 'No message',
        },
        EMAILJS_PUBLIC_KEY
      )
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-charcoal-deep relative noise-bg construction-lines" aria-label="Request a free quote">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: CTA Copy */}
          <RevealDiv>
            <span className="text-emerald font-semibold text-sm tracking-widest uppercase">
              Free Quote
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mt-3 mb-6">
              Ready to Remodel
              <br />
              Your LA Home?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Fill out the form and Anton will personally call you back within 1
              hour to discuss your project. No sales pitch — just honest answers.
            </p>

            <div className="space-y-5 mb-10">
              {[
                'Free estimate — no obligation',
                'Response within 1 hour',
                `California Licensed & Insured — ${COMPANY.license}`,
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-white font-semibold mb-1">Prefer to talk now?</div>
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="text-emerald hover:text-white font-bold text-2xl transition-colors"
              >
                {COMPANY.phone}
              </a>
            </div>
          </RevealDiv>

          {/* Right: Form */}
          <RevealDiv delay={2}>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
              <h3 className="font-display text-2xl text-charcoal mb-6">
                Get Your Free Quote
              </h3>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-charcoal text-sm bg-cream/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-1.5">
                      Phone Number <span className="text-emerald">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="(310) 000-0000"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border text-charcoal text-sm bg-cream/50 ${
                        phoneError ? 'border-red-400' : 'border-gray-200'
                      }`}
                      aria-required="true"
                    />
                    {phoneError && (
                      <p className="text-red-500 text-xs mt-1">Phone number is required</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-charcoal text-sm bg-cream/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-semibold text-charcoal mb-1.5">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-charcoal text-sm bg-cream/50"
                    >
                      <option value="">Select your project...</option>
                      <option>Kitchen Remodeling</option>
                      <option>Bathroom Remodeling</option>
                      <option>Full Home / Condo Gut Remodel</option>
                      <option>Flooring & Painting</option>
                      <option>Custom Door Installation</option>
                      <option>Permitting & HOA Coordination</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-1.5">
                      Tell Us About Your Project
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="What are you looking to remodel? Any specific details..."
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-charcoal text-sm bg-cream/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-emerald hover:bg-emerald-dark disabled:bg-emerald/70 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-colors cta-pulse flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Get My Free Quote →'
                    )}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    No spam. No obligation. Anton calls you directly.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald" />
                  </div>
                  <h4 className="font-display text-2xl text-charcoal mb-2">Thank you!</h4>
                  <p className="text-gray-600 text-lg">Anton will call you within 1 hour.</p>
                  <p className="text-gray-500 text-sm mt-2">Can't wait? Call now:</p>
                  <a
                    href={`tel:${COMPANY.phoneTel}`}
                    className="text-emerald font-bold text-xl"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              )}
            </div>
          </RevealDiv>
        </div>
      </div>
    </section>
  )
}
