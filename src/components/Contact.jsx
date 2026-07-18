import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Send, Loader2, ChevronDown, User, FileText, MessageSquare, CheckCircle2 } from 'lucide-react'
import { useSearchParams, Link } from 'react-router-dom'
import SuccessModal from './SuccessModal'
import { submitLoanApplication, getFaqList, submitContactForm } from '../services/loanService'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({ name: '', number: '', email: '', city: '', profession: '', loan_type: searchParams.get('loan') || '', business_name: '', loan_amount: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [generatedToken, setGeneratedToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef(null)

  // ─── FAQ state ────────────────────────────────────────────────────────
  const [faqs, setFaqs] = useState([])
  const [faqCategories, setFaqCategories] = useState([])
  const [activeFaqCategory, setActiveFaqCategory] = useState('')
  const [openFaqId, setOpenFaqId] = useState(null)
  const [faqLoading, setFaqLoading] = useState(true)
  const [faqError, setFaqError] = useState('')

  // ─── Contact (General Enquiry) form state ──────────────────────────────
  const initialContactForm = { full_name: '', mobile: '', email: '', subject: '', message: '' }
  const [contactForm, setContactForm] = useState(initialContactForm)
  const [contactLoading, setContactLoading] = useState(false)
  const [contactError, setContactError] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const contactFormRef = useRef(null)
  const contactSuccessRef = useRef(null)

  // Update loan field if URL param changes
  useEffect(() => {
    const loanFromUrl = searchParams.get('loan')
    if (loanFromUrl) setForm(f => ({ ...f, loan_type: loanFromUrl }))
  }, [searchParams])

  // Fetch FAQs
  useEffect(() => {
    const fetchFaqs = async () => {
      setFaqLoading(true)
      setFaqError('')
      try {
        const result = await getFaqList()
        const data = result.data || []
        setFaqs(data)

        const seen = new Set()
        const cats = []
        data.forEach(item => {
          if (item.category && !seen.has(item.category)) {
            seen.add(item.category)
            cats.push(item.category)
          }
        })
        setFaqCategories(cats)
        if (cats.length) setActiveFaqCategory(cats[0])
      } catch (err) {
        setFaqError(err.message || 'Unable to fetch FAQs. Please try again later.')
      } finally {
        setFaqLoading(false)
      }
    }
    fetchFaqs()
  }, [])

  const handleChange = e => { 
    let { name, value } = e.target;
    if (name === 'number') value = value.replace(/^\+91[\s-]?/, '');
    setForm(f => ({ ...f, [name]: value })); 
    setError('') 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await submitLoanApplication(form)
      setGeneratedToken(result.data.token)
      gsap.to(formRef.current, {
        scale: 0.97, opacity: 0.5, duration: 0.2, ease: 'power2.in',
        onComplete: () => {
          setSubmitted(true)
          gsap.to(formRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' })
        }
      })
    } catch (err) {
      setError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleContactChange = (e) => {
    let { name, value } = e.target
    if (name === 'mobile') value = value.replace(/\D/g, '').slice(0, 10)
    setContactForm(f => ({ ...f, [name]: value }))
    setContactError('')
  }

  const validateContactForm = () => {
    if (!contactForm.full_name.trim()) return 'Please enter your full name.'
    if (!/^[6-9]\d{9}$/.test(contactForm.mobile)) return 'Please enter a valid 10-digit mobile number.'
    if (!/^\S+@\S+\.\S+$/.test(contactForm.email)) return 'Please enter a valid email address.'
    if (!contactForm.subject.trim()) return 'Please enter a subject.'
    if (!contactForm.message.trim()) return 'Please enter your message.'
    return ''
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    const validationError = validateContactForm()
    if (validationError) {
      setContactError(validationError)
      return
    }

    setContactLoading(true)
    setContactError('')

    try {
      await submitContactForm(contactForm)

      gsap.to(contactFormRef.current, {
        scale: 0.97, opacity: 0.5, duration: 0.2, ease: 'power2.in',
        onComplete: () => {
          setContactSubmitted(true)
          setContactForm(initialContactForm)
          requestAnimationFrame(() => {
            if (contactSuccessRef.current) {
              gsap.fromTo(
                contactSuccessRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
              )
            }
          })
        }
      })
    } catch (err) {
      setContactError(err.message || 'Something went wrong. Please try again later.')
    } finally {
      setContactLoading(false)
    }
  }

  const handleContactSendAnother = () => {
    setContactSubmitted(false)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const faqHeader = sectionRef.current?.querySelector('.faq-header')
      const faqTabsEl = sectionRef.current?.querySelector('.faq-tabs')
      const header = sectionRef.current?.querySelector('.ct-header')
      const infoCards = sectionRef.current?.querySelectorAll('.ci-card')
      const mapEl = sectionRef.current?.querySelector('.ct-map')

      if (faqHeader) gsap.fromTo(faqHeader, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: faqHeader, start: 'top 88%' } })
      if (faqTabsEl) gsap.fromTo(faqTabsEl, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: faqTabsEl, start: 'top 88%' } })
      if (header) gsap.fromTo(header, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: header, start: 'top 88%' } })
      if (infoCards?.length) gsap.fromTo(infoCards, { x: -60, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: infoCards[0], start: 'top 82%' } })
      if (mapEl) gsap.fromTo(mapEl, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: mapEl, start: 'top 82%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Animate FAQ cards whenever active category / faqs change
  useEffect(() => {
    if (!sectionRef.current) return
    const cards = sectionRef.current.querySelectorAll('.faq-card')
    if (cards.length) {
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
      )
    }
  }, [activeFaqCategory, faqs])

  const filteredFaqs = faqs.filter(f => f.category === activeFaqCategory)

  const handleFaqCategoryClick = (cat) => {
    setActiveFaqCategory(cat)
    setOpenFaqId(null)
  }

  const toggleFaqOpen = (id) => {
    setOpenFaqId(prev => (prev === id ? null : id))
  }

  const contactInfo = [
    { icon: MapPin, title: 'Our Office', lines: ['Unit No. 309, 3rd Floor, Tower-A', 'SAS Tower, Medicity, Sector-38', 'Gurgaon 122001'], gradient: 'from-[#0176C7] to-[#0155AD]' },
    { icon: Phone, title: 'Call Us', lines: ['+91 9990323833'], href: 'tel:+919990323833', gradient: 'from-blue-500 to-indigo-500' },
    { icon: Mail, title: 'Email Us', lines: ['info@zerocommissionloan.com'], href: 'mailto:info@zerocommissionloan.com', gradient: 'from-purple-500 to-violet-600' },
  ]

  return (
    <>
    <section ref={sectionRef} id="contact" className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)' }}>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c5cae9, transparent)', filter: 'blur(70px)', transform: 'translate(30%,-30%)' }} />
      <div className="absolute top-[700px] left-0 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c5cae9, transparent)', filter: 'blur(70px)', transform: 'translate(-30%,0)' }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">

        {/* ─── FAQ Section ──────────────────────────────────────────── */}
        <div className="mb-28">
          <div className="faq-header text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full mb-5 border"
              style={{ backgroundColor: '#e8eaf6', color: '#1a237e', borderColor: '#c5cae9' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a237e]" /> FAQs
            </div>
            <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#1a237e' }}>
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-xl">Everything you need to know about loans, eligibility, and our process.</p>
          </div>

          {!faqLoading && !faqError && faqCategories.length > 0 && (
            <div className="faq-tabs flex flex-wrap justify-center gap-3 mb-12">
              {faqCategories.map(cat => {
                const active = cat === activeFaqCategory
                return (
                  <button
                    key={cat}
                    onClick={() => handleFaqCategoryClick(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                      active ? 'text-white shadow-lg scale-[1.03]' : 'text-gray-600 bg-white hover:border-[#0176C7] hover:text-[#0176C7]'
                    }`}
                    style={active
                      ? { background: 'linear-gradient(135deg, #0176C7, #0155AD)', borderColor: 'transparent' }
                      : { borderColor: 'rgba(0,0,0,0.08)' }}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          )}

          {faqLoading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 size={32} className="animate-spin text-[#0176C7]" />
              <p className="text-gray-500 text-sm">Loading FAQs...</p>
            </div>
          )}

          {!faqLoading && faqError && (
            <div className="text-center py-20">
              <p className="text-red-500 font-medium">{faqError}</p>
            </div>
          )}

          {!faqLoading && !faqError && (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredFaqs.map((item, idx) => {
                const isOpen = openFaqId === item.id
                return (
                  <div
                    key={item.id}
                    className="faq-card relative bg-white rounded-2xl p-6 pl-7 transition-all duration-300 cursor-pointer"
                    style={{
                      border: '1px solid rgba(0,0,0,0.05)',
                      borderLeft: '4px solid #f5a623',
                      boxShadow: isOpen ? '0 10px 30px rgba(26,35,126,0.1)' : '0 4px 20px rgba(0,0,0,0.04)',
                    }}
                    onClick={() => toggleFaqOpen(item.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-bold text-base md:text-lg leading-snug" style={{ color: '#1a237e' }}>
                        {idx + 1}. {item.question}
                      </h3>
                      <ChevronDown
                        size={20}
                        className="flex-shrink-0 mt-1 text-[#0176C7] transition-transform duration-300"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? '300px' : '0px', marginTop: isOpen ? '0.75rem' : '0px' }}
                    >
                      <p className="text-gray-500 text-[15px] leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                )
              })}

              {filteredFaqs.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-400">No FAQs found in this category.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── Contact Section (existing) ──────────────────────────── */}
        <div className="ct-header text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full mb-5 border"
            style={{ backgroundColor: '#e8eaf6', color: '#1a237e', borderColor: '#c5cae9' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a237e]" /> Get In Touch
          </div>
          <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#1a237e' }}>
            Let's Talk{' '}
            <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">About Your Loan</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-xl">Our team is ready to help you find the perfect financial solution. Reach out today.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-stretch">

          {/* Info */}
          <div className="space-y-6">
            {contactInfo.map(({ icon: Icon, title, lines, href, gradient }) => (
              <div key={title} className="ci-card flex items-start gap-5 bg-white rounded-2xl p-6 hover:translate-x-2 hover:shadow-xl transition-all duration-300 cursor-default"
                style={{ border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-base mb-1.5" style={{ color: '#1a237e' }}>{title}</div>
                  {lines.map((line, j) => (
                    <div key={j} className="text-gray-500 text-[15px] leading-relaxed">
                      {href && j === 0 ? <a href={href} className="hover:text-[#0176C7] transition-colors">{line}</a> : line}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="ct-map rounded-3xl overflow-hidden h-full min-h-[400px] relative"
              style={{ background: 'linear-gradient(135deg,#e8eaf6,#f3f4ff)', border: '1px solid rgba(26,35,126,0.08)', boxShadow: '0 20px 60px rgba(26,35,126,0.1)' }}>
              <iframe
                src="https://maps.google.com/maps?q=Unit%20No.%20309,%203rd%20Floor,%20Tower-A%20of%20SAS%20Tower,%20Support%20Area,%20Medicity,%20Sector-38,%20Gurgaon%20122001&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* General Enquiry Form */}
          <div className="ci-card relative">
            <div
              className="absolute -top-24 -right-16 w-72 h-72 rounded-full opacity-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #c5cae9, transparent)', filter: 'blur(60px)' }}
            />
            {contactSubmitted ? (
              <div
                ref={contactSuccessRef}
                className="relative bg-white rounded-3xl p-10 md:p-12 text-center flex flex-col items-center h-full justify-center min-h-[400px]"
                style={{ border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 60px rgba(26,35,126,0.1)' }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0176C7, #0155AD)' }}
                >
                  <CheckCircle2 size={36} className="text-white" />
                </div>
                <h3 className="font-bold text-3xl mb-3" style={{ color: '#1a237e' }}>
                  Thank You!
                </h3>
                <p className="text-gray-500 text-base max-w-sm leading-relaxed">
                  Your message has been received. Our team will connect with you within 24 hours.
                </p>
                <button
                  onClick={handleContactSendAnother}
                  className="mt-8 px-7 py-3 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0176C7, #0155AD)' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                ref={contactFormRef}
                onSubmit={handleContactSubmit}
                className="relative bg-white rounded-3xl p-7 md:p-9 space-y-6 h-full"
                style={{ border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 60px rgba(26,35,126,0.1)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #0176C7, #0155AD)' }}
                  >
                    <Send size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl" style={{ color: '#1a237e' }}>
                      Send Us a Message
                    </h3>
                    <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </div>

                <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(1,118,199,0.15), transparent)' }} />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative group">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0176C7] transition-colors" />
                    <input
                      type="text"
                      name="full_name"
                      value={contactForm.full_name}
                      onChange={handleContactChange}
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm outline-none transition-all duration-300 focus:border-[#0176C7] focus:shadow-[0_0_0_3px_rgba(1,118,199,0.1)] bg-[#f8f9ff]"
                      style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                    />
                  </div>

                  <div className="relative group">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0176C7] transition-colors" />
                    <input
                      type="tel"
                      name="mobile"
                      value={contactForm.mobile}
                      onChange={handleContactChange}
                      placeholder="Mobile Number"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm outline-none transition-all duration-300 focus:border-[#0176C7] focus:shadow-[0_0_0_3px_rgba(1,118,199,0.1)] bg-[#f8f9ff]"
                      style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0176C7] transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm outline-none transition-all duration-300 focus:border-[#0176C7] focus:shadow-[0_0_0_3px_rgba(1,118,199,0.1)] bg-[#f8f9ff]"
                    style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                  />
                </div>

                <div className="relative group">
                  <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0176C7] transition-colors" />
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    placeholder="Subject"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm outline-none transition-all duration-300 focus:border-[#0176C7] focus:shadow-[0_0_0_3px_rgba(1,118,199,0.1)] bg-[#f8f9ff]"
                    style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                  />
                </div>

                <div className="relative group">
                  <MessageSquare size={18} className="absolute left-3 top-4 text-gray-400 group-focus-within:text-[#0176C7] transition-colors" />
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Your Message"
                    rows={5}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm outline-none resize-none transition-all duration-300 focus:border-[#0176C7] focus:shadow-[0_0_0_3px_rgba(1,118,199,0.1)] bg-[#f8f9ff]"
                    style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                  />
                </div>

                {contactError && (
                  <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">{contactError}</p>
                )}

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0176C7, #0155AD)' }}
                >
                  {contactLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
    </>
  )
}