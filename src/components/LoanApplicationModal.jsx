import { useState, useEffect, useRef } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import SuccessModal from './SuccessModal';
import { gsap } from 'gsap';
import { submitLoanApplication } from '../services/loanService';

const PROFESSION_OPTIONS = [
  { label: 'Salaried', value: 'SALARIED' },
  { label: 'Self Employed', value: 'SELF_EMPLOYED' },
  { label: 'Business Owner', value: 'BUSINESS_OWNER' },
  { label: 'Professional', value: 'PROFESSIONAL' },
  { label: 'Student', value: 'STUDENT' },
  { label: 'Retired', value: 'RETIRED' },
  { label: 'Homemaker', value: 'HOMEMAKER' },
];

const LOAN_TYPE_OPTIONS = [
  { label: 'Personal Loan', value: 'Personal Loan' },
  { label: 'Business Loan', value: 'Business Loan' },
  { label: 'Car Loan', value: 'Car Loan' },
  { label: 'Education Loan', value: 'Education Loan' },
  { label: 'Home Loan', value: 'Home Loan' },
  { label: 'Two-Wheeler Loan', value: 'Two-Wheeler Loan' },
  { label: 'Medical Loan', value: 'Medical Loan' },
  { label: 'Travel Loan', value: 'Travel Loan' },
];

const EMPTY_FORM = {
  name: '',
  number: '',
  email: '',
  profession: '',
  loan_type: '',
  loan_amount: '',
  message: '',
};

export default function LoanApplicationModal({ isOpen, onClose, defaultLoanType }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, loan_type: defaultLoanType || '' });
  const [submitted, setSubmitted] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    if (defaultLoanType) setForm(f => ({ ...f, loan_type: defaultLoanType }));
  }, [defaultLoanType]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { scale: 0.9, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen && !submitted) return null;

  const handleChange = e => {
    let { name, value } = e.target;
    if (name === 'number') {
      // Strip +91, +91-, or +91<space> from the beginning
      value = value.replace(/^\+91[\s-]?/, '');
    }
    setForm(f => ({ ...f, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await submitLoanApplication(form);
      setGeneratedToken(result.data.token);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setGeneratedToken('');
    setForm({ ...EMPTY_FORM });
    onClose();
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <SuccessModal
          token={generatedToken}
          loanType={form.loan_type}
          onClose={handleClose}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 sticky top-0 z-10">
          <div>
            <h3 className="font-display font-bold text-2xl" style={{ color: '#1a237e' }}>
              Apply for a Loan
            </h3>
            <p className="text-sm text-gray-500 mt-1">Fill out the form below to get started instantly.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors self-start"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {[{ name: 'name', label: 'Full Name', placeholder: 'Rahul Sharma', type: 'text' }, { name: 'number', label: 'Phone', placeholder: '+91 9999999999', type: 'text' }].map(f => (
                <div key={f.name}>
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handleChange} required placeholder={f.placeholder} type={f.type}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0197E0] focus:ring-2 focus:ring-blue-50 hover:border-gray-300 transition-all"
                    style={{ color: '#1a237e' }} />
                </div>
              ))}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0197E0] focus:ring-2 focus:ring-blue-50 hover:border-gray-300 transition-all"
                style={{ color: '#1a237e' }} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">Loan Type</label>
              <select name="loan_type" value={form.loan_type} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0197E0] focus:ring-2 focus:ring-blue-50 text-gray-600 bg-white hover:border-gray-300 transition-all">
                <option value="">Select loan type</option>
                {LOAN_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">Profession</label>
              <select name="profession" value={form.profession} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0197E0] focus:ring-2 focus:ring-blue-50 text-gray-600 bg-white hover:border-gray-300 transition-all">
                <option value="">Select Profession</option>
                {PROFESSION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">Loan Amount</label>
              <input name="loan_amount" type="number" value={form.loan_amount} onChange={handleChange} required placeholder="e.g. 500000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0197E0] focus:ring-2 focus:ring-blue-50 hover:border-gray-300 transition-all"
                style={{ color: '#1a237e' }} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">Message (Optional)</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about your requirements..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0197E0] focus:ring-2 focus:ring-blue-50 resize-none hover:border-gray-300 transition-all" />
            </div>
            {error && (
              <div className="px-4 py-3 rounded-xl text-sm font-medium text-red-700 bg-red-50 border border-red-200">
                ⚠️ {error}
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-3 text-white py-4 rounded-2xl font-bold text-base hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 mt-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{ background: 'linear-gradient(135deg,#0197E0,#0155AD)', boxShadow: '0 10px 30px rgba(1,151,224,0.3)' }}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><Send size={16} /> Submit Application</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}