import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import {
  User, Phone, Calendar, CreditCard, Search, CheckCircle, XCircle,
  AlertCircle, FileText, RefreshCw, BarChart2, Download, MapPin,
  ChevronDown, ChevronUp, Info, PieChart, Clock
} from 'lucide-react';

/* ─── helpers ─────────────────────────────────────────────── */
function getInitials(name) {
  return name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

/* ─── Speedometer SVG ──────────────────────────────────────── */
function SpeedometerGauge({ score }) {
  const W = 260, H = 155, cx = 130, cy = 120, r = 100, sw = 14;

  const toAngle = (s) => Math.PI * (1 - (s - 300) / 600);
  const pt = (s, radius) => {
    const a = toAngle(s);
    return { x: cx + radius * Math.cos(a), y: cy - radius * Math.sin(a) };
  };
  const arc = (s1, s2) => {
    const p1 = pt(s1, r), p2 = pt(s2, r);
    const large = (s2 - s1) > 300 ? 1 : 0;
    return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  };

  const segments = [
    { from: 300, to: 550, color: '#ef4444' }, // Red
    { from: 550, to: 650, color: '#f59e0b' }, // Orange/Yellow
    { from: 650, to: 750, color: '#22c55e' }, // Light Green
    { from: 750, to: 900, color: '#16a34a' }, // Dark Green
  ];

  const labelScores = [
    { s: 300, label: '300' },
    { s: 550, label: '550' },
    { s: 650, label: '650' },
    { s: 750, label: '750' },
    { s: 900, label: '900' },
  ];

  // Needle polygon (triangle)
  const angle = toAngle(Math.min(Math.max(score, 300), 900));
  const needleLength = r - 20;
  const needleTip = { x: cx + needleLength * Math.cos(angle), y: cy - needleLength * Math.sin(angle) };
  // Base of the needle (perpendicular to the needle direction)
  const baseWidth = 6;
  const leftBase = { x: cx + baseWidth * Math.cos(angle + Math.PI / 2), y: cy - baseWidth * Math.sin(angle + Math.PI / 2) };
  const rightBase = { x: cx + baseWidth * Math.cos(angle - Math.PI / 2), y: cy - baseWidth * Math.sin(angle - Math.PI / 2) };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: 220, overflow: 'visible' }}>
      {/* colour segments */}
      {segments.map((seg, i) => (
        <path key={i} d={arc(seg.from, seg.to)} fill="none" stroke={seg.color} strokeWidth={sw} strokeLinecap="butt" />
      ))}
      
      {/* rounded caps for the ends */}
      <circle cx={pt(300, r).x} cy={pt(300, r).y} r={sw/2} fill="#ef4444" />
      <circle cx={pt(900, r).x} cy={pt(900, r).y} r={sw/2} fill="#16a34a" />

      {/* tick labels */}
      {labelScores.map(({ s, label }) => {
        const isEnd = s === 300 || s === 900;
        // Position ends directly below the arc endpoints, others outwards radially
        const lp = isEnd ? pt(s, r) : pt(s, r + 18);
        const yOffset = isEnd ? 20 : 0;
        
        return (
          <text key={s} x={lp.x.toFixed(2)} y={(lp.y + yOffset).toFixed(2)}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="10" fill="#6b7280" fontWeight="600">
            {label}
          </text>
        );
      })}
      
      {/* needle polygon */}
      <polygon 
        points={`${needleTip.x},${needleTip.y} ${rightBase.x},${rightBase.y} ${leftBase.x},${leftBase.y}`} 
        fill="#1e3a8a" 
      />
      {/* needle center circle */}
      <circle cx={cx} cy={cy} r="4" fill="#1e3a8a" />
    </svg>
  );
}

/* ─── Dummy data generator ──────────────────────────────────── */
function generateCibilData(formData) {
  const panHash = formData.panNumber.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const score = 580 + (panHash % 271); // Dynamic dummy score between 580 - 850

  let rating, ratingColor, ratingBg, ratingDesc;
  if (score >= 750) {
    rating = 'Excellent'; ratingColor = '#16a34a'; ratingBg = '#dcfce7'; // Dark green
    ratingDesc = 'You have an excellent credit score. You are highly likely to get approved at the best interest rates.';
  } else if (score >= 650) {
    rating = 'Good'; ratingColor = '#22c55e'; ratingBg = '#dcfce7'; // Light green
    ratingDesc = 'You have a good credit score. This shows you are using credit responsibly and are likely to be approved for new credit.';
  } else if (score >= 550) {
    rating = 'Fair'; ratingColor = '#f59e0b'; ratingBg = '#fef3c7'; // Orange
    ratingDesc = 'Your credit score is fair. You may be approved for credit but may not receive the best interest rates.';
  } else {
    rating = 'Poor'; ratingColor = '#ef4444'; ratingBg = '#fee2e2'; // Red
    ratingDesc = 'Your credit score needs improvement. Focus on paying bills on time and reducing outstanding debt.';
  }

  const dobDate = new Date(formData.dob);
  const dobStr  = dobDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '); // e.g. 15 Feb 2000

  const now         = new Date();
  const reportDate  = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const reportTime  = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

  const creditAge    = score >= 750 ? '85' : score >= 700 ? '72' : '48';
  const totalInq     = score >= 750 ? '2'  : score >= 700 ? '5'  : '12';
  const pmtHist      = score >= 750 ? '100%' : score >= 700 ? '89%' : '74%';
  const pmtRating    = score >= 750 ? 'Excellent' : score >= 700 ? 'Good' : 'Fair';
  const utilPct      = score >= 750 ? '22.4%' : score >= 700 ? '38.6%' : '62.1%';
  const utilRating   = score >= 750 ? 'Low' : score >= 700 ? 'Medium' : 'High';
  const creditMix    = score >= 750 ? '20%' : score >= 700 ? '10%' : '0%';
  const creditMixRating = score >= 750 ? 'High' : score >= 700 ? 'Medium' : 'Low';
  
  const totalAcc     = score >= 750 ? 12 : 8;
  const activeAcc    = score >= 750 ? 8  : 5;
  const closedAcc    = totalAcc - activeAcc;
  const overdueAcc   = score >= 700 ? 0  : 1;
  const creditLimit  = score >= 750 ? '₹12,50,000' : score >= 700 ? '₹8,50,000' : '₹4,00,000';

  return {
    score, rating, ratingColor, ratingBg, ratingDesc,
    name: `${formData.firstName} ${formData.lastName}`,
    mobile: formData.mobile,
    dob: dobStr,
    pan: formData.panNumber.toUpperCase(),
    reportDate, reportTime,
    creditAge, totalInq,
    pmtHist, pmtRating, 
    utilPct, utilRating,
    creditMix, creditMixRating,
    totalAcc, activeAcc, closedAcc, overdueAcc, creditLimit,
    accounts: [
      { type: 'Home Loan',     bank: 'HDFC Bank',  opened: '2019-03', outstanding: '₹18,40,000', limit: '₹25,00,000', status: 'Active', dpd: 0 },
      { type: 'Credit Card',   bank: 'ICICI Bank', opened: '2021-07', outstanding: '₹42,500',    limit: '₹1,50,000',  status: 'Active', dpd: 0 },
      { type: 'Personal Loan', bank: 'Axis Bank',  opened: '2020-11', outstanding: '₹0',         limit: '₹2,00,000',  status: 'Closed', dpd: 0 },
      { type: 'Auto Loan',     bank: 'SBI',        opened: '2022-01', outstanding: '₹3,20,000',  limit: '₹5,50,000',  status: 'Active', dpd: 0 },
    ],
  };
}

/* ─── Input field helper ────────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 transition-all
        ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus-within:border-[#0197E0] focus-within:bg-white focus-within:shadow-sm'}`}>
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function CheckCibil() {
  const [form, setForm]           = useState({ firstName: '', lastName: '', mobile: '', dob: '', panNumber: '' });
  const [errors, setErrors]       = useState({});
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState(null); // Set to generateCibilData(form) if you want it open by default
  const [showAccounts, setShowAccounts] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim())  e.lastName  = 'Last name is required';
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = 'Enter valid 10-digit mobile number';
    if (!form.dob) e.dob = 'Date of birth is required';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.panNumber.toUpperCase()))
      e.panNumber = 'Enter valid 10-character PAN (e.g. ABCDE1234F)';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: name === 'panNumber' ? value.toUpperCase() : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setResult(generateCibilData(form)); setLoading(false); }, 1000);
  };

  const handleReset = () => {
    setForm({ firstName: '', lastName: '', mobile: '', dob: '', panNumber: '' });
    setErrors({});
    setResult(null);
    setShowAccounts(false);
  };

  return (
    <AdminLayout title="Check Cibil Report" subtitle="Enter the details below to check Cibil report." showBack={false}>

      {/* ══════════════════ FORM ══════════════════ */}
      {!result && (
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-8 max-w-4xl mx-auto">
          {/* header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)' }}>
              <BarChart2 size={22} className="text-[#0197E0]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a237e]">Check Cibil Report</h2>
              <p className="text-gray-500 text-sm mt-0.5">Enter the details below to generate report.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Field label="First Name" error={errors.firstName}>
                <User size={17} className="text-gray-400 flex-shrink-0" />
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange}
                  placeholder="Enter first name"
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none" />
              </Field>
              <Field label="Last Name" error={errors.lastName}>
                <User size={17} className="text-gray-400 flex-shrink-0" />
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange}
                  placeholder="Enter last name"
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none" />
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Field label="Mobile Number" error={errors.mobile}>
                <Phone size={17} className="text-gray-400 flex-shrink-0" />
                <input type="tel" name="mobile" value={form.mobile} onChange={handleChange}
                  placeholder="Enter mobile number" maxLength={10}
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none" />
              </Field>
              <Field label="Date of Birth" error={errors.dob}>
                <Calendar size={17} className="text-gray-400 flex-shrink-0" />
                <input type="date" name="dob" value={form.dob} onChange={handleChange}
                  className="flex-1 bg-transparent text-gray-800 text-sm outline-none" />
              </Field>
            </div>
            <div className="mb-8">
              <Field label="PAN Number" error={errors.panNumber}>
                <CreditCard size={17} className="text-gray-400 flex-shrink-0" />
                <input type="text" name="panNumber" value={form.panNumber} onChange={handleChange}
                  placeholder="Enter PAN number" maxLength={10}
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none tracking-widest uppercase" />
              </Field>
              {!errors.panNumber && (
                <p className="text-gray-500 text-xs mt-1.5">Enter valid 10-character PAN number (e.g. ABCDE1234F)</p>
              )}
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-bold text-base transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg,#0155AD,#0197E0)' }}>
              {loading
                ? <><RefreshCw size={18} className="animate-spin" /> Generating Report…</>
                : <><Search size={18} /> Generate Report</>}
            </button>
          </form>
        </div>
      )}

      {/* ══════════════════ RESULT ══════════════════ */}
      {result && (
        <div className="max-w-[96%] xl:max-w-[1200px] mx-auto space-y-8 mt-12 mb-12">
          
          {/* ① User header card */}
          <div className="bg-white border border-gray-100 rounded-[20px] shadow-sm p-6
            flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-purple-100 text-purple-700 font-bold text-2xl flex-shrink-0">
                {getInitials(result.name)}
              </div>
              <div>
                <div className="flex items-center gap-4 mb-1.5">
                  <span className="font-bold text-gray-900 text-xl">{result.name}</span>
                  <span className="bg-green-50 text-green-600 border border-green-100 text-[12px] font-bold px-3 py-1 rounded-full">
                    Report Generated
                  </span>
                </div>
                <p className="text-[14px] text-gray-500 font-medium mt-1">
                  Mobile: {result.mobile} <span className="mx-1.5 text-gray-300">|</span> 
                  DOB: {result.dob} <span className="mx-1.5 text-gray-300">|</span> 
                  PAN: {result.pan}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 border-t md:border-t-0 pt-5 md:pt-0">
              <div className="text-right">
                <p className="text-[13px] text-gray-400 font-medium mb-1">Report Date & Time</p>
                <p className="text-[15px] font-bold text-gray-700">{result.reportDate}, {result.reportTime}</p>
              </div>
              <button onClick={() => window.print()}
                className="flex items-center gap-2 text-[15px] font-bold text-blue-600 border border-blue-200 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all bg-white">
                <Download size={18} /> Download PDF
              </button>
            </div>
          </div>

          {/* ② CIBIL Score & Summary */}
          <div>
            <h3 className="font-bold text-gray-800 text-[18px] mb-4 ml-1">CIBIL Score & Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-5">
              
              {/* Score + Gauge Card — gauge on top for mobile, score left on desktop */}
              <div className="bg-white border border-gray-100 rounded-[20px] shadow-sm p-6 sm:p-8 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-6">
                {/* Gauge — shown first on mobile */}
                <div className="flex justify-center w-full sm:hidden">
                  <div className="transform scale-100">
                    <SpeedometerGauge score={result.score} />
                  </div>
                </div>
                {/* Score text */}
                <div className="flex flex-col items-center sm:items-start min-w-[140px]">
                  <p className="text-[14px] font-semibold text-gray-500 mb-2">CIBIL Score</p>
                  <p className="text-[72px] sm:text-[80px] font-bold text-[#111827] leading-[1] mb-4">{result.score}</p>
                  <span className="font-bold text-[18px]" style={{ color: result.ratingColor }}>
                    {result.rating}
                  </span>
                  <p className="text-[14px] text-gray-500 mt-4 font-medium">Out of 900</p>
                </div>
                {/* Gauge — shown on desktop (right side) */}
                <div className="hidden sm:flex flex-1 justify-center w-full transform scale-110 sm:scale-125">
                  <SpeedometerGauge score={result.score} />
                </div>
              </div>

              {/* Rating Desc Card */}
              <div className="bg-white border border-gray-100 rounded-[20px] shadow-sm p-8 flex flex-col justify-center">
                <p className="text-[16px] font-bold text-gray-900 mb-4">Score Rating</p>
                <span className="inline-block px-4 py-1.5 rounded-lg text-[15px] font-bold mb-5 self-start"
                  style={{ background: result.ratingBg, color: result.ratingColor }}>
                  {result.rating}
                </span>
                <p className="text-[14px] text-gray-500 leading-[1.7] font-medium pr-4">
                  {result.ratingDesc}
                </p>
              </div>
            </div>
          </div>

          {/* ③ Quick Summary */}
          <div>
            <h3 className="font-bold text-gray-800 text-[18px] mb-4 ml-1">Quick Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Calendar,    label: 'Oldest Credit Account',   value: result.creditAge, sub: 'Months',       color: 'text-blue-500',   bg: 'bg-blue-50' },
                { icon: Search,      label: 'Total Inquiries',          value: result.totalInq,  sub: 'Total',        color: 'text-blue-500',   bg: 'bg-blue-50' },
                { icon: CheckCircle, label: 'On-Time Payment History',  value: result.pmtHist,   sub: result.pmtRating,  color: 'text-green-500',  bg: 'bg-green-50' },
                { icon: CreditCard,  label: 'Credit Card Utilization',  value: result.utilPct,   sub: result.utilRating, color: 'text-blue-500',   bg: 'bg-blue-50' },
                { icon: Clock,       label: 'Credit Mix',               value: result.creditMix, sub: result.creditMixRating, color: 'text-blue-500', bg: 'bg-blue-50' },
              ].map(({ icon: Icon, label, value, sub, color, bg }) => (
                <div key={label} className="flex flex-col items-center text-center p-6 rounded-[20px] bg-white border border-gray-100 shadow-sm">
                  <div className={`w-[56px] h-[56px] rounded-full ${bg} flex items-center justify-center mb-4`}>
                    <Icon size={24} className={color} strokeWidth={2.5} />
                  </div>
                  <p className="text-[12px] font-bold text-gray-700 leading-tight mb-2 whitespace-nowrap">{label}</p>
                  <p className="text-[28px] font-bold text-gray-900 leading-none mb-2">{value}</p>
                  <p className="text-[13px] text-gray-400 font-medium">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ④ Personal Info + Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-5">
            
            {/* Personal Info */}
            <div className="bg-white border border-gray-100 rounded-[20px] shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <User size={22} className="text-blue-500" />
                <h3 className="font-bold text-gray-900 text-[18px]">Personal Information</h3>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'Name',          value: result.name },
                  { label: 'Date of Birth', value: result.dob },
                  { label: 'PAN Number',    value: result.pan },
                  { label: 'Mobile Number', value: result.mobile },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-gray-500 text-[15px] font-medium">{label}</span>
                    <span className="text-gray-900 font-bold text-[15px]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white border border-gray-100 rounded-[20px] shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <MapPin size={22} className="text-blue-500" />
                <h3 className="font-bold text-gray-900 text-[18px]">Addresses</h3>
              </div>
              
              <div className="space-y-7">
                {/* Current Address */}
                <div className="flex gap-5">
                  <div className="w-[32px] h-[32px] rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[14px] font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="text-[15px] font-bold text-gray-900">Current Address</span>
                      <span className="text-[11px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-md">Reported on 30 Apr 2026</span>
                    </div>
                    <p className="text-[14px] font-medium text-gray-600 leading-[1.7] max-w-lg">
                      HDFC BANK LIMITED C3 3RD FLOOR TVS FLOOR MILAP NAGAR NZ8216 NZ8216 BLOCK B MILAP NAGAR UTTAM NAGAR NEW DELHI DELHI 110059
                    </p>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gray-50 ml-12"></div>

                {/* Previous Address */}
                <div className="flex gap-5">
                  <div className="w-[32px] h-[32px] rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[14px] font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="text-[15px] font-bold text-gray-900">Previous Address</span>
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">Reported on 15 Apr 2025</span>
                    </div>
                    <p className="text-[14px] font-medium text-gray-600 leading-[1.7]">
                      NEW DELHI, DELHI – 110059
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ⑤ Credit Accounts Summary */}
          <div>
            <h3 className="font-bold text-gray-800 text-[18px] mb-4 ml-1">Credit Accounts Summary</h3>
            <div className="bg-white border border-gray-100 rounded-[20px] shadow-sm p-6">
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {[
                  { icon: FileText,     label: 'Total Accounts',   value: result.totalAcc,   sub: 'Total',       color: 'text-blue-500',   bg: 'bg-blue-50' },
                  { icon: User,         label: 'Active Accounts',  value: result.activeAcc,  sub: 'Active',      color: 'text-green-500',  bg: 'bg-green-50' },
                  { icon: FileText,     label: 'Closed Accounts',  value: result.closedAcc,  sub: 'Closed',      color: 'text-orange-500', bg: 'bg-orange-50' },
                  { icon: AlertCircle,  label: 'Overdue Accounts', value: result.overdueAcc, sub: 'Overdue',     color: 'text-red-500',    bg: 'bg-red-50' },
                  { icon: CreditCard,   label: 'Credit Limit',     value: result.creditLimit, sub: 'Total Limit', color: 'text-blue-500',   bg: 'bg-blue-50' },
                ].map(({ icon: Icon, label, value, sub, color, bg }) => (
                  <div key={label} className="flex flex-col items-center text-center p-5 rounded-[16px] border border-gray-100">
                    <div className="flex items-center gap-3 mb-4 w-full justify-center">
                      <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                        <Icon size={18} className={color} strokeWidth={2.5} />
                      </div>
                      <span className="text-[13px] font-semibold text-gray-600 leading-tight">{label}</span>
                    </div>
                    <p className="text-[26px] font-bold text-gray-900 mb-1.5">{value}</p>
                    <p className="text-[13px] text-gray-400 font-medium">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Toggle button */}
              <div className="flex justify-center border-t border-gray-50 pt-6">
                <button onClick={() => setShowAccounts(v => !v)}
                  className="flex items-center gap-2 text-[14px] font-bold text-blue-600 border border-blue-200 px-8 py-3 rounded-xl hover:bg-blue-50 transition-all">
                  View Detailed Accounts
                  {showAccounts ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Accounts — card layout on mobile, table on desktop */}
              {showAccounts && (
                <>
                  {/* Desktop table */}
                  <div className="mt-6 hidden sm:block overflow-x-auto border border-gray-100 rounded-2xl">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-[12px] uppercase tracking-wider border-b border-gray-100">
                          {['Account Type','Bank','Opened','Outstanding','Limit','DPD','Status'].map((h, i) => (
                            <th key={h} className={`py-4 px-6 font-bold ${i===0 ? 'rounded-tl-2xl' : ''}`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {result.accounts.map((acc, i) => (
                          <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-6 font-bold text-gray-900 text-[14px]">{acc.type}</td>
                            <td className="py-4 px-6 text-gray-600 text-[14px] font-medium">{acc.bank}</td>
                            <td className="py-4 px-6 text-gray-600 text-[14px] font-medium">{acc.opened}</td>
                            <td className="py-4 px-6 font-bold text-gray-900 text-[14px]">{acc.outstanding}</td>
                            <td className="py-4 px-6 text-gray-600 text-[14px] font-medium">{acc.limit}</td>
                            <td className="py-4 px-6 text-[14px]">
                              <span className={`font-bold ${acc.dpd > 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                {acc.dpd > 0 ? `${acc.dpd} Days` : '-'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-[14px]">
                              <span className={`inline-flex items-center px-3 py-1.5 rounded-lg font-bold text-[12px] uppercase
                                ${acc.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                {acc.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Mobile cards */}
                  <div className="mt-6 sm:hidden space-y-3">
                    {result.accounts.map((acc, i) => (
                      <div key={i} className="border border-gray-100 rounded-2xl p-4 space-y-3">
                        {/* header row */}
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900 text-[15px]">{acc.type}</span>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg font-bold text-[11px] uppercase
                            ${acc.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                            {acc.status}
                          </span>
                        </div>
                        {/* detail grid */}
                        <div className="grid grid-cols-2 gap-y-2 text-[13px]">
                          <div>
                            <p className="text-gray-400 font-medium text-[11px] mb-0.5">Bank</p>
                            <p className="font-semibold text-gray-700">{acc.bank}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 font-medium text-[11px] mb-0.5">Opened</p>
                            <p className="font-semibold text-gray-700">{acc.opened}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 font-medium text-[11px] mb-0.5">Outstanding</p>
                            <p className="font-bold text-gray-900">{acc.outstanding}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 font-medium text-[11px] mb-0.5">Limit</p>
                            <p className="font-semibold text-gray-700">{acc.limit}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 font-medium text-[11px] mb-0.5">DPD</p>
                            <p className={`font-bold ${acc.dpd > 0 ? 'text-red-500' : 'text-gray-500'}`}>
                              {acc.dpd > 0 ? `${acc.dpd} Days` : '-'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ⑥ Important Note */}
          <div className="bg-[#f0f4ff] rounded-[20px] p-6 flex items-start gap-5">
            <div className="w-8 h-8 rounded-full border border-blue-500 flex items-center justify-center flex-shrink-0 text-blue-600 mt-0.5">
              <Info size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[15px] font-bold text-blue-700 mb-1.5">Important Note</p>
              <p className="text-[14px] text-gray-600 leading-[1.6] font-medium">
                This CIBIL report is generated from TransUnion CIBIL. The score and details are subject to change as per new updates.<br/>
                Always verify details before making any credit decision.
              </p>
            </div>
          </div>

          {/* ⑦ Bottom action buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-5 pt-4">
            <button onClick={handleReset}
              className="flex items-center justify-center gap-2 text-[15px] font-bold text-blue-600 border border-blue-200 bg-white px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all">
              <RefreshCw size={16} /> Search Another
            </button>
            <button onClick={() => window.print()}
              className="flex items-center justify-center gap-2 text-[15px] font-bold text-white px-8 py-3.5 rounded-xl transition-all hover:shadow-lg bg-blue-600 hover:bg-blue-700">
              <Download size={16} /> Download PDF Report
            </button>
          </div>

        </div>
      )}
    </AdminLayout>
  );
}
