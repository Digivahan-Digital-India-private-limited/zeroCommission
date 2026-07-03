import { useState, useCallback } from 'react'
import { FileText, CheckCircle2, Clock, Bell, Shield, Headphones, RefreshCw, ChevronRight, X, RotateCcw } from 'lucide-react'
import { getApplicationStatusById, refreshApplicationStatus } from '../services/loanService'

// ---- Step state helpers ----
function getTimelineEntry(appData, keyword) {
  const entry = (appData?.timeline || []).find(t => 
    t.title?.toLowerCase().includes(keyword.toLowerCase())
  )
  if (!entry) return null
  return entry
}

function formatDatetime(dtStr) {
  if (!dtStr) return null
  try {
    const d = new Date(dtStr.replace(' ', 'T'))
    return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch { return dtStr }
}

function getSteps(appData) {
  const hasSubmitted    = appData?.hasSubmitted    ?? !!(appData?.loanApplicationId)
  const hasDocuments    = appData?.hasDocuments    ?? false
  const hasVerification = appData?.hasVerification ?? false
  const hasApproval     = appData?.hasApproval     ?? false
  const hasDisbursement = appData?.hasDisbursement ?? false
  const isRejected      = appData?.isRejected      ?? false

  const submittedEntry    = getTimelineEntry(appData, 'application submitted')
  const documentsEntry    = getTimelineEntry(appData, 'documents uploaded')
  const verificationEntry = getTimelineEntry(appData, 'verification')
  const approvalEntry     = getTimelineEntry(appData, 'approved')
  const disbursementEntry = getTimelineEntry(appData, 'disburs')

  return [
    {
      key: 'submitted',
      title: 'Application Submitted',
      desc: submittedEntry?.summary || formatDatetime(submittedEntry?.datetime) || 'Your application has been received',
      datetime: formatDatetime(submittedEntry?.datetime),
      state: hasSubmitted ? 'done' : 'pending',
    },
    {
      key: 'documents',
      title: 'Documents Uploaded',
      desc: documentsEntry?.summary || (hasDocuments ? 'All required documents uploaded' : 'Waiting for document submission'),
      datetime: formatDatetime(documentsEntry?.datetime),
      state: hasDocuments ? 'done' : hasSubmitted ? 'active' : 'pending',
    },
    {
      key: 'verification',
      title: 'Verification In Progress',
      desc: verificationEntry?.summary
        || (isRejected ? 'Verification failed'
          : hasApproval ? 'Verification completed successfully'
          : 'Our team is verifying your information'),
      datetime: formatDatetime(verificationEntry?.datetime),
      state: hasApproval ? 'done' : isRejected ? 'rejected' : hasVerification ? 'done' : hasDocuments ? 'active' : 'pending',
    },
    {
      key: 'approval',
      title: 'Approval Pending',
      desc: approvalEntry?.summary
        || (hasDisbursement ? 'Loan approved and disbursed!'
          : hasApproval ? 'Your loan has been approved!'
          : isRejected ? 'Application was rejected'
          : 'We will notify you once approved'),
      datetime: formatDatetime(approvalEntry?.datetime),
      state: hasDisbursement ? 'done' : hasApproval ? 'done' : isRejected ? 'rejected' : 'pending',
    },
    {
      key: 'disbursement',
      title: 'Disbursement',
      desc: disbursementEntry?.summary || (hasDisbursement ? 'Amount has been credited to your account' : 'Amount will be credited to your account'),
      datetime: formatDatetime(disbursementEntry?.datetime),
      state: hasDisbursement ? 'done' : 'pending',
    },
  ]
}

// ---- Step Icon ----
function StepIcon({ state }) {
  if (state === 'done') {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 12px rgba(34,197,94,0.35)' }}>
        <CheckCircle2 size={20} className="text-white" strokeWidth={2.5} />
      </div>
    )
  }
  if (state === 'active') {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
        style={{ background: 'linear-gradient(135deg,#0197E0,#0155AD)', boxShadow: '0 4px 12px rgba(1,151,224,0.35)' }}>
        <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: '#0197E0' }} />
        <RefreshCw size={18} className="text-white animate-spin" style={{ animationDuration: '2s' }} />
      </div>
    )
  }
  if (state === 'rejected') {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
        style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)', boxShadow: '0 4px 12px rgba(239,68,68,0.35)' }}>
        <X size={18} className="text-white" strokeWidth={2.5} />
      </div>
    )
  }
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
      style={{ background: '#f1f5f9', border: '2px dashed #cbd5e1' }}>
      <Clock size={16} className="text-gray-400" />
    </div>
  )
}

// ---- Status Badge ----
function StatusBadge({ state }) {
  const map = {
    done:     { label: 'Completed',   bg: '#f0fdf4', color: '#16a34a', border: '#86efac' },
    active:   { label: 'In Progress', bg: '#eff6ff', color: '#0155AD', border: '#93c5fd' },
    pending:  { label: 'Pending',     bg: '#f9fafb', color: '#6b7280', border: '#e5e7eb' },
    rejected: { label: 'Rejected',    bg: '#fef2f2', color: '#dc2626', border: '#fca5a5' },
  }
  const cfg = map[state] || map.pending
  return (
    <span className="text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 whitespace-nowrap"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
      {cfg.label}
    </span>
  )
}

// ---- Feature cards ----
const FEATURES = [
  { icon: CheckCircle2, iconBg: '#f0fdf4', iconColor: '#22c55e', title: 'Real-time Updates',   desc: 'Get instant updates at every step of your application.' },
  { icon: Bell,         iconBg: '#eff6ff', iconColor: '#0197E0', title: 'Transparent Process', desc: 'Stay informed with clear visibility of your application status.' },
  { icon: Shield,       iconBg: '#f5f3ff', iconColor: '#7c3aed', title: 'Secure & Safe',        desc: 'Your data is protected with bank-level security and encryption.' },
  { icon: Headphones,   iconBg: '#fff7ed', iconColor: '#ea580c', title: 'Expert Support',       desc: 'Our experts are always available to assist you.' },
]

// ---- Main Component ----
export default function TrackApplication({ appData: initialAppData, onReset }) {
  const [appData, setAppData]           = useState(initialAppData)
  const [refreshing, setRefreshing]     = useState(false)
  const [refreshError, setRefreshError] = useState('')
  const [lastRefreshed, setLastRefreshed] = useState(null)

  const handleRefresh = useCallback(async () => {
    if (!appData?.authToken) {
      // If we don't have auth token, fallback or just return
      setRefreshError('Authentication token missing. Please log in again.')
      return
    }
    setRefreshing(true)
    setRefreshError('')
    try {
      const result = await refreshApplicationStatus(appData.authToken)
      setAppData(result.data)
      setLastRefreshed(new Date())
    } catch (err) {
      setRefreshError(err.message || 'Failed to refresh. Please try again.')
    } finally {
      setRefreshing(false)
    }
  }, [appData])

  const steps = appData ? getSteps(appData) : []

  if (!appData) return null

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* LEFT — Timeline */}
          <div className="bg-white rounded-3xl overflow-hidden"
            style={{ border: '1px solid rgba(26,35,126,0.08)', boxShadow: '0 20px 60px rgba(26,35,126,0.08)' }}>
            <div className="h-1.5" style={{ background: 'linear-gradient(90deg,#0197E0,#0155AD)' }} />

            <div className="p-6 md:p-8">
              {/* Application header */}
              <div className="flex items-start gap-4 mb-6 pb-5"
                style={{ borderBottom: '1px solid rgba(26,35,126,0.07)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#e8eaf6,#c5cae9)' }}>
                  <FileText size={22} style={{ color: '#1a237e' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-base" style={{ color: '#0f1857' }}>Your Loan Application</p>
                  <p className="text-sm text-gray-500">
                    Application ID:{' '}
                    <span className="font-bold" style={{ color: '#0176C7' }}>{appData.loanApplicationId || appData.token || 'N/A'}</span>
                  </p>
                  {appData.loan && <p className="text-xs text-gray-400 mt-0.5">🏦 {appData.loan}</p>}
                </div>
                <StatusBadge state={
                  (() => {
                    if (appData.isRejected) return 'rejected'
                    if (appData.hasDisbursement || appData.hasApproval) return 'done'
                    return 'active'
                  })()
                } />
              </div>

              {(appData.remarks || appData.summary) && (
                <div className="mb-6 p-4 rounded-xl flex gap-3 items-start" style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e0f2fe' }}>
                    <FileText size={16} style={{ color: '#0284c7' }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7] mb-1">Latest Remarks from Admin</p>
                    <p className="text-sm text-gray-700 font-medium whitespace-pre-wrap">{appData.remarks || appData.summary}</p>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="space-y-0">
                {steps.map((s, idx) => {
                  const isLast = idx === steps.length - 1
                  return (
                    <div key={s.key} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <StepIcon state={s.state} />
                        {!isLast && (
                          <div className="w-0.5 flex-1 my-1"
                            style={{
                              background: s.state === 'done'
                                ? 'linear-gradient(180deg,#22c55e,#86efac)'
                                : 'repeating-linear-gradient(180deg,#cbd5e1 0px,#cbd5e1 6px,transparent 6px,transparent 12px)',
                              minHeight: 28
                            }} />
                        )}
                      </div>
                      <div className={`flex-1 flex items-center justify-between gap-3 ${!isLast ? 'pb-4' : ''}`}>
                        <div>
                          <p className="font-bold text-sm" style={{ color: '#0f1857' }}>{s.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                          {s.datetime && (
                            <p className="text-[10px] mt-0.5 font-medium" style={{ color: '#0176C7' }}>🕐 {s.datetime}</p>
                          )}
                        </div>
                        <StatusBadge state={s.state} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Bottom help row */}
              <div className="mt-6 pt-5 flex items-center gap-4"
                style={{ borderTop: '1px solid rgba(26,35,126,0.07)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#eff6ff' }}>
                  <Headphones size={18} style={{ color: '#0197E0' }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: '#0f1857' }}>Need Help?</p>
                  <p className="text-xs text-gray-400">Our loan experts are here for you</p>
                </div>
                <a href="/contact"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#0197E0,#0155AD)', boxShadow: '0 8px 20px rgba(1,151,224,0.3)' }}>
                  Contact Expert <ChevronRight size={14} />
                </a>
              </div>

              {/* ✅ Refresh Button */}
              <div className="mt-4 flex flex-col items-center gap-1">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{
                    background: 'linear-gradient(135deg,#0197E0,#0155AD)',
                    boxShadow: '0 6px 20px rgba(1,151,224,0.25)',
                  }}
                >
                  <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
                  {refreshing ? 'Refreshing...' : 'Refresh Status'}
                </button>
                {lastRefreshed && !refreshError && (
                  <p className="text-xs text-gray-400">Last updated: {lastRefreshed.toLocaleTimeString('en-IN')}</p>
                )}
                {refreshError && (
                  <p className="text-xs text-red-500 font-medium">⚠️ {refreshError}</p>
                )}
              </div>

              <button onClick={onReset}
                className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-gray-500 hover:text-[#0176C7] hover:bg-blue-50 transition-all">
                <RotateCcw size={14} /> Track another application
              </button>
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-black text-3xl mb-2" style={{ color: '#0f1857' }}>
                Track Your <span style={{ color: '#0176C7' }}>Application</span><span style={{ color: '#0197E0' }}>.</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Real-time updates on your loan application status at every step.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5"
              style={{ border: '1px solid rgba(26,35,126,0.08)', boxShadow: '0 8px 30px rgba(26,35,126,0.06)' }}>
              <div className="space-y-5">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: f.iconBg }}>
                        <Icon size={20} style={{ color: f.iconColor }} />
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: '#0f1857' }}>{f.title}</p>
                        <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 flex items-center gap-4"
              style={{ border: '1px solid rgba(26,35,126,0.08)', boxShadow: '0 4px 16px rgba(26,35,126,0.05)' }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#f5f3ff' }}>
                <Shield size={20} style={{ color: '#7c3aed' }} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#0f1857' }}>Your information is 100% secure</p>
                <p className="text-xs text-gray-400">We use industry-leading encryption to protect your data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}