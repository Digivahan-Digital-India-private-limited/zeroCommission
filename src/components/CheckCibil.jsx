import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import {
  User,
  Phone,
  Calendar,
  CreditCard,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  FileText,
  RefreshCw,
  Award,
  Clock,
  BarChart2,
} from 'lucide-react';

// Dummy CIBIL data generator based on PAN number
function generateCibilData(formData) {
  const panHash = formData.panNumber
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const score = 580 + (panHash % 271); // 580–850 range

  const accounts = [
    {
      type: 'Home Loan',
      bank: 'HDFC Bank',
      opened: '2019-03',
      outstanding: '₹18,40,000',
      limit: '₹25,00,000',
      status: 'Active',
      dpd: 0,
    },
    {
      type: 'Credit Card',
      bank: 'ICICI Bank',
      opened: '2021-07',
      outstanding: '₹42,500',
      limit: '₹1,50,000',
      status: 'Active',
      dpd: 0,
    },
    {
      type: 'Personal Loan',
      bank: 'Axis Bank',
      opened: '2020-11',
      outstanding: '₹0',
      limit: '₹2,00,000',
      status: 'Closed',
      dpd: 0,
    },
    {
      type: 'Auto Loan',
      bank: 'SBI',
      opened: '2022-01',
      outstanding: '₹3,20,000',
      limit: '₹5,50,000',
      status: 'Active',
      dpd: panHash % 3 === 0 ? 30 : 0,
    },
  ];

  const enquiries = [
    { date: '2025-12-10', bank: 'Kotak Mahindra', purpose: 'Personal Loan' },
    { date: '2025-09-22', bank: 'HDFC Bank', purpose: 'Credit Card' },
    { date: '2025-06-05', bank: 'Bajaj Finance', purpose: 'Consumer Loan' },
  ];

  let rating = 'Excellent';
  let ratingColor = '#16a34a';
  let ratingBg = '#f0fdf4';
  let ratingIcon = TrendingUp;

  if (score < 650) {
    rating = 'Poor';
    ratingColor = '#dc2626';
    ratingBg = '#fef2f2';
    ratingIcon = TrendingDown;
  } else if (score < 700) {
    rating = 'Fair';
    ratingColor = '#d97706';
    ratingBg = '#fffbeb';
    ratingIcon = Minus;
  } else if (score < 750) {
    rating = 'Good';
    ratingColor = '#2563eb';
    ratingBg = '#eff6ff';
    ratingIcon = TrendingUp;
  }

  return {
    score,
    rating,
    ratingColor,
    ratingBg,
    ratingIcon,
    name: `${formData.firstName} ${formData.lastName}`,
    mobile: formData.mobile,
    dob: formData.dob,
    pan: formData.panNumber,
    reportDate: new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    creditAge: '6 Years 4 Months',
    totalAccounts: accounts.length,
    activeAccounts: accounts.filter((a) => a.status === 'Active').length,
    closedAccounts: accounts.filter((a) => a.status === 'Closed').length,
    totalEnquiries: enquiries.length,
    accounts,
    enquiries,
    paymentHistory: score >= 750 ? '98%' : score >= 700 ? '89%' : '74%',
    creditUtilization: score >= 750 ? '22%' : score >= 700 ? '38%' : '62%',
  };
}

// Score gauge arc component
function ScoreGauge({ score }) {
  const min = 300;
  const max = 900;
  const pct = (score - min) / (max - min);
  const angle = -220 + pct * 260;
  const rad = (angle * Math.PI) / 180;
  const cx = 110,
    cy = 110,
    r = 88;
  const needleX = cx + r * Math.cos(rad);
  const needleY = cy + r * Math.sin(rad);

  const arcStart = {
    x: cx + r * Math.cos((-220 * Math.PI) / 180),
    y: cy + r * Math.sin((-220 * Math.PI) / 180),
  };
  const arcEnd = {
    x: cx + r * Math.cos((40 * Math.PI) / 180),
    y: cy + r * Math.sin((40 * Math.PI) / 180),
  };
  const fillEnd = { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };

  const largeArc = 260 > 180 ? 1 : 0;
  const fillLarge = pct * 260 > 180 ? 1 : 0;

  const trackPath = `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 ${largeArc} 1 ${arcEnd.x} ${arcEnd.y}`;
  const fillPath = `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 ${fillLarge} 1 ${fillEnd.x} ${fillEnd.y}`;

  const scoreColor =
    score >= 750
      ? '#16a34a'
      : score >= 700
      ? '#2563eb'
      : score >= 650
      ? '#d97706'
      : '#dc2626';

  return (
    <svg viewBox="0 0 220 150" width="220" height="150">
      <path
        d={trackPath}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d={fillPath}
        fill="none"
        stroke={scoreColor}
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.9"
      />
      <line
        x1={cx}
        y1={cy}
        x2={needleX}
        y2={needleY}
        stroke={scoreColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="8" fill={scoreColor} />
      <circle cx={cx} cy={cy} r="4" fill="white" />
      <text x="18" y="130" fontSize="10" fill="#9ca3af" fontWeight="600">
        300
      </text>
      <text x="87" y="26" fontSize="10" fill="#9ca3af" fontWeight="600">
        600
      </text>
      <text x="183" y="130" fontSize="10" fill="#9ca3af" fontWeight="600">
        900
      </text>
    </svg>
  );
}

export default function CheckCibil() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    dob: '',
    panNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!/^[6-9]\d{9}$/.test(form.mobile))
      errs.mobile = 'Enter valid 10-digit mobile number';
    if (!form.dob) errs.dob = 'Date of birth is required';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber.toUpperCase()))
      errs.panNumber = 'Enter valid 10-character PAN (e.g. ABCDE1234F)';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'panNumber' ? value.toUpperCase() : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(generateCibilData(form));
      setLoading(false);
    }, 1800);
  };

  const handleReset = () => {
    setForm({ firstName: '', lastName: '', mobile: '', dob: '', panNumber: '' });
    setErrors({});
    setResult(null);
  };

  const RatingIcon = result?.ratingIcon;

  return (
    <AdminLayout
      title="Welcome Back, Admin"
      subtitle="Here's what's happening with your platform today."
    >
      {/* Form Card */}
      {!result && (
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-8 max-w-4xl mx-auto">
          {/* Card Header */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)' }}
            >
              <BarChart2 size={22} className="text-[#0197E0]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a237e]">
                Check Cibil Report
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">
                Enter the details below to check Cibil report.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <div
                  className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 transition-all ${
                    errors.firstName
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 focus-within:border-[#0197E0] focus-within:bg-white focus-within:shadow-sm'
                  }`}
                >
                  <User size={17} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <div
                  className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 transition-all ${
                    errors.lastName
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 focus-within:border-[#0197E0] focus-within:bg-white focus-within:shadow-sm'
                  }`}
                >
                  <User size={17} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div
                  className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 transition-all ${
                    errors.mobile
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 focus-within:border-[#0197E0] focus-within:bg-white focus-within:shadow-sm'
                  }`}
                >
                  <Phone size={17} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    maxLength={10}
                    className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none"
                  />
                </div>
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth
                </label>
                <div
                  className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 transition-all ${
                    errors.dob
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 focus-within:border-[#0197E0] focus-within:bg-white focus-within:shadow-sm'
                  }`}
                >
                  <Calendar size={17} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none"
                  />
                </div>
                {errors.dob && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.dob}</p>
                )}
              </div>
            </div>

            {/* Row 3: PAN */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PAN Number
              </label>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 transition-all ${
                  errors.panNumber
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 focus-within:border-[#0197E0] focus-within:bg-white focus-within:shadow-sm'
                }`}
              >
                <CreditCard size={17} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  name="panNumber"
                  value={form.panNumber}
                  onChange={handleChange}
                  placeholder="Enter PAN number"
                  maxLength={10}
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none tracking-widest uppercase"
                />
              </div>
              {errors.panNumber ? (
                <p className="text-red-500 text-xs mt-1.5">{errors.panNumber}</p>
              ) : (
                <p className="text-gray-500 text-xs mt-1.5">
                  Enter valid 10-character PAN number (e.g. ABCDE1234F)
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-bold text-base transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg,#0155AD,#0197E0)' }}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Fetching CIBIL Report…
                </>
              ) : (
                <>
                  <Search size={18} />
                  Check Cibil Report
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* ---- CIBIL RESULT ---- */}
      {result && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Top action bar */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Report generated on{' '}
              <span className="font-semibold text-gray-600">
                {result.reportDate}
              </span>
            </p>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm font-semibold text-[#0155AD] border border-[#0155AD] px-4 py-2 rounded-xl hover:bg-blue-50 transition-all"
            >
              <RefreshCw size={14} />
              New Search
            </button>
          </div>

          {/* Score + Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score Card */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <Shield size={16} style={{ color: result.ratingColor }} />
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: result.ratingColor }}
                >
                  CIBIL Score
                </span>
              </div>
              <ScoreGauge score={result.score} />
              <div className="text-center mt-2">
                <p
                  className="text-5xl font-black"
                  style={{ color: result.ratingColor }}
                >
                  {result.score}
                </p>
                <div
                  className="inline-flex items-center gap-1.5 mt-2 px-4 py-1.5 rounded-full text-sm font-bold"
                  style={{
                    background: result.ratingBg,
                    color: result.ratingColor,
                  }}
                >
                  {RatingIcon && <RatingIcon size={14} />}
                  {result.rating}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Score Range: 300 – 900
                </p>
              </div>
            </div>

            {/* Personal Info Card */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-5">
                Personal Details
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Full Name', value: result.name, icon: User },
                  { label: 'Mobile', value: result.mobile, icon: Phone },
                  {
                    label: 'Date of Birth',
                    value: new Date(result.dob).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }),
                    icon: Calendar,
                  },
                  { label: 'PAN Number', value: result.pan, icon: CreditCard },
                  { label: 'Credit Age', value: result.creditAge, icon: Clock },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-[#0197E0]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: 'Total Accounts',
                value: result.totalAccounts,
                icon: FileText,
                color: 'text-blue-500',
                bg: 'bg-blue-50',
              },
              {
                label: 'Active Accounts',
                value: result.activeAccounts,
                icon: CheckCircle,
                color: 'text-green-500',
                bg: 'bg-green-50',
              },
              {
                label: 'Payment History',
                value: result.paymentHistory,
                icon: Award,
                color: 'text-indigo-500',
                bg: 'bg-indigo-50',
              },
              {
                label: 'Credit Utilization',
                value: result.creditUtilization,
                icon: BarChart2,
                color: 'text-amber-500',
                bg: 'bg-amber-50',
              },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.04)] p-5"
              >
                <div
                  className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}
                >
                  <Icon size={18} className={color} />
                </div>
                <p className="text-xs text-gray-400 font-medium">{label}</p>
                <p className="text-xl font-black text-[#1a237e] mt-0.5">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Credit Accounts Table */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-5">
              Credit Accounts
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                    <th className="text-left py-3 pr-4 font-semibold">
                      Account Type
                    </th>
                    <th className="text-left py-3 pr-4 font-semibold">Bank</th>
                    <th className="text-left py-3 pr-4 font-semibold">
                      Opened
                    </th>
                    <th className="text-left py-3 pr-4 font-semibold">
                      Outstanding
                    </th>
                    <th className="text-left py-3 pr-4 font-semibold">
                      Limit
                    </th>
                    <th className="text-left py-3 pr-4 font-semibold">DPD</th>
                    <th className="text-left py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {result.accounts.map((acc, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 pr-4 font-semibold text-gray-800">
                        {acc.type}
                      </td>
                      <td className="py-3.5 pr-4 text-gray-600">{acc.bank}</td>
                      <td className="py-3.5 pr-4 text-gray-600">
                        {acc.opened}
                      </td>
                      <td className="py-3.5 pr-4 font-semibold text-gray-800">
                        {acc.outstanding}
                      </td>
                      <td className="py-3.5 pr-4 text-gray-600">{acc.limit}</td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={`font-bold ${
                            acc.dpd > 0 ? 'text-red-500' : 'text-green-600'
                          }`}
                        >
                          {acc.dpd > 0 ? `${acc.dpd} Days` : 'NIL'}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            acc.status === 'Active'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {acc.status === 'Active' ? (
                            <CheckCircle size={11} />
                          ) : (
                            <XCircle size={11} />
                          )}
                          {acc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Enquiries */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-5">
              Recent Enquiries ({result.totalEnquiries})
            </h3>
            <div className="space-y-3">
              {result.enquiries.map((enq, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                      <Search size={14} className="text-[#0197E0]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {enq.bank}
                      </p>
                      <p className="text-xs text-gray-400">{enq.purpose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={12} />
                    {new Date(enq.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-800 text-xs">
            <AlertCircle
              size={15}
              className="flex-shrink-0 mt-0.5 text-amber-500"
            />
            <p>
              <strong>Disclaimer:</strong> This is a simulated CIBIL report for
              demonstration purposes only. For an actual CIBIL report, please
              visit the official TransUnion CIBIL website.
            </p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
