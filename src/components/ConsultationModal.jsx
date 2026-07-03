import { createGuestTicket } from "../services/loanService";
import { useState, useEffect } from 'react';
import { X, Headphones, User, Phone, FileText, MessageSquare, Loader2, CheckCircle2, Ticket, ChevronRight, Copy, Check } from 'lucide-react';



export default function ConsultationModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ customer_name: '', phone_number: '', subject: '', issue: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // { ticket_id }
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Lock scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset state on close
      setTimeout(() => {
        setForm({ customer_name: '', phone_number: '', subject: '', issue: '' });
        setErrors({});
        setSuccess(null);
        setLoading(false);
      }, 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.customer_name.trim()) e.customer_name = 'Name is required';
    if (!form.phone_number.trim()) e.phone_number = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone_number.trim())) e.phone_number = 'Enter a valid 10-digit Indian mobile number';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.issue.trim()) e.issue = 'Issue description is required';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('customer_name', form.customer_name.trim());
      fd.append('phone_number', form.phone_number.trim());
      fd.append('subject', form.subject.trim());
      fd.append('issue', form.issue.trim());

      const data = await createGuestTicket(fd);
      
      if (data.status) {
        setSuccess({ ticket_id: data.ticket_id });
      } else {
        setErrors({ _api: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      console.error(err);
  
      setErrors({
          _api: err.message || "Network Error"
      });
  } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'rgba(10, 20, 60, 0.55)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        pointerEvents: 'none',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 24,
          width: '100%',
          maxWidth: 520,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(10,20,80,0.22)',
          pointerEvents: 'auto',
          animation: 'slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          position: 'relative',
        }}>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(120deg, #0d2478 0%, #0155AD 60%, #0176C7 100%)',
            borderRadius: '24px 24px 0 0',
            padding: '28px 28px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Glow blob */}
            <div style={{
              position: 'absolute', top: -30, right: -30,
              width: 140, height: 140, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(1,182,255,0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <button onClick={onClose} style={{
              position: 'absolute', top: 16, right: 16,
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Headphones size={24} color="#fff" />
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>
                  FREE CONSULTATION
                </div>
                <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 900, margin: 0, lineHeight: 1.2 }}>
                  Get Expert Loan Advice
                </h2>
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13.5, margin: '12px 0 0', lineHeight: 1.6 }}>
              Share your issue — our experts will contact you within 24 hours.
            </p>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 28px 28px' }}>

            {success ? (
              /* ─── Success Screen ─── */
              <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0155AD, #0176C7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 12px 32px rgba(1,85,173,0.3)',
                }}>
                  <CheckCircle2 size={36} color="#fff" />
                </div>

                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0d2478', margin: '0 0 8px' }}>
                  Ticket Created! 🎉
                </h3>
                <p style={{ color: '#64748b', fontSize: 14.5, margin: '0 0 24px', lineHeight: 1.6 }}>
                  Your support ticket has been created successfully.<br />
                  Our experts will reach out to you shortly.
                </p>

                {/* Ticket ID Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #f0f6ff, #e8f0fe)',
                  border: '1.5px solid #bfdbfe',
                  borderRadius: 16,
                  padding: '18px 20px',
                  marginBottom: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}>
                  {/* Ticket icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: '#0155AD',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Ticket size={20} color="#fff" />
                  </div>

                  {/* ID text */}
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                      Your Ticket ID
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#0d2478', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
                      {success.ticket_id}
                    </div>
                  </div>

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(success.ticket_id)}
                    title="Copy Ticket ID"
                    style={{
                      flexShrink: 0,
                      width: 38, height: 38,
                      borderRadius: 10,
                      border: copied ? '1.5px solid #16a34a' : '1.5px solid #bfdbfe',
                      background: copied ? '#f0fdf4' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 2px 8px rgba(1,85,173,0.08)',
                    }}
                  >
                    {copied
                      ? <Check size={16} color="#16a34a" />
                      : <Copy size={16} color="#0155AD" />
                    }
                  </button>
                </div>

                <button
                  onClick={onClose}
                  style={{
                    width: '100%', padding: '13px 24px',
                    background: 'linear-gradient(120deg, #0d2478, #0155AD)',
                    color: '#fff', border: 'none', borderRadius: 12,
                    fontSize: 15, fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 8px 20px rgba(1,85,173,0.3)',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Done <ChevronRight size={18} />
                </button>
              </div>
            ) : (
              /* ─── Form ─── */
              <form onSubmit={handleSubmit} noValidate>

                {/* API Error */}
                {errors._api && (
                  <div style={{
                    background: '#fef2f2', border: '1px solid #fecaca',
                    borderRadius: 10, padding: '10px 14px', marginBottom: 16,
                    color: '#dc2626', fontSize: 13.5, fontWeight: 600,
                  }}>
                    {errors._api}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                  {/* Name */}
                  <Field
                    icon={<User size={16} />}
                    label="Your Name"
                    error={errors.customer_name}
                  >
                    <input
                      name="customer_name"
                      value={form.customer_name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Kumar"
                      style={inputStyle(!!errors.customer_name)}
                    />
                  </Field>

                  {/* Phone */}
                  <Field
                    icon={<Phone size={16} />}
                    label="Phone Number"
                    error={errors.phone_number}
                  >
                    <input
                      name="phone_number"
                      value={form.phone_number}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      style={inputStyle(!!errors.phone_number)}
                    />
                  </Field>

                  {/* Subject */}
                  <Field
                    icon={<FileText size={16} />}
                    label="Subject"
                    error={errors.subject}
                  >
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="e.g. Loan Issue, Application Status"
                      style={inputStyle(!!errors.subject)}
                    />
                  </Field>

                  {/* Issue */}
                  <Field
                    icon={<MessageSquare size={16} />}
                    label="Your Issue"
                    error={errors.issue}
                  >
                    <textarea
                      name="issue"
                      value={form.issue}
                      onChange={handleChange}
                      placeholder="Describe your problem in detail..."
                      rows={4}
                      style={{ ...inputStyle(!!errors.issue), resize: 'vertical', minHeight: 90 }}
                    />
                  </Field>

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 22,
                    width: '100%', padding: '14px 24px',
                    background: loading
                      ? 'rgba(1,85,173,0.6)'
                      : 'linear-gradient(120deg, #0d2478 0%, #0155AD 60%, #0176C7 100%)',
                    color: '#fff', border: 'none', borderRadius: 12,
                    fontSize: 15.5, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                    boxShadow: '0 8px 24px rgba(1,85,173,0.28)',
                    transition: 'opacity 0.2s',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.92'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  {loading
                    ? <><Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> Submitting...</>
                    : <><Headphones size={18} /> Get Free Consultation</>
                  }
                </button>

                <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, margin: '12px 0 0' }}>
                  🔒 Your information is 100% safe and secure
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </>
  );
}

/* ── Helper sub-components ── */

function Field({ icon, label, error, children }) {
  return (
    <div>
      <label style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6,
      }}>
        <span style={{ color: '#0155AD' }}>{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4, fontWeight: 600 }}>
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

function inputStyle(hasError) {
  return {
    width: '100%',
    padding: '11px 14px',
    border: `1.5px solid ${hasError ? '#fca5a5' : '#e2e8f0'}`,
    borderRadius: 10,
    fontSize: 14,
    color: '#1e293b',
    background: hasError ? '#fff5f5' : '#f8faff',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    display: 'block',
  };
}
