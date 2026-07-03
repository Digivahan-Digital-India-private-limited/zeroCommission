import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import {
  Users,
  TrendingUp,
  CreditCard,
  Activity,
  Clock,
  CheckCircle,
  Eye,
  EyeOff,
  XCircle,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useAdmin } from './AdminContext';
import { adminRefreshTokenAPI } from '../services/loanService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { applications, stats, loading, error, refresh } = useAdmin();
  const [tokenRefreshing, setTokenRefreshing] = useState(false);
  const [tokenMsg, setTokenMsg] = useState('');

  const handleRefreshToken = async () => {
    setTokenRefreshing(true);
    setTokenMsg('');
    try {
      await adminRefreshTokenAPI();
      setTokenMsg('✓ Token refreshed successfully');
    } catch (err) {
      setTokenMsg('✗ ' + (err.message || 'Failed to refresh token'));
    } finally {
      setTokenRefreshing(false);
      // Clear message after 4 seconds
      setTimeout(() => setTokenMsg(''), 4000);
    }
  };

  // Derived counts from live data
  const viewedApps    = applications.filter(a => a.viewed).length;
  const unviewedApps  = applications.filter(a => !a.viewed).length;
  const pendingApps   = applications.filter(a => a.status === 'Pending').length;
  const uploadedDocs  = applications.filter(a => a.docs === 'Uploaded' || a.docs === 'Uploaded Documents').length;
  const pendingDocs   = applications.filter(a => a.docs === 'Pending' || a.docs === 'Pending Documents').length;

  const cards = [
    { label: 'Total Applications',  value: stats.total     ?? applications.length,        icon: Users,        color: 'text-blue-500',    bg: 'bg-blue-50',    route: '/page/admin/total-applications'    },
    { label: 'View Applications',   value: viewedApps,                                    icon: Eye,          color: 'text-indigo-500',  bg: 'bg-indigo-50',  route: '/page/admin/view-applications'     },
    { label: 'Unviewed Applications',value: unviewedApps,                                 icon: EyeOff, color: 'text-orange-500', bg: 'bg-orange-50', route: '/page/admin/unviewed-applications' },
    { label: 'Pending Applications',value: stats.pending   ?? pendingApps,                icon: Activity,     color: 'text-amber-500',   bg: 'bg-amber-50',   route: '/page/admin/pending-applications'  },
    { label: 'Rejected Applications',value: stats.rejected ?? 0,                          icon: XCircle,      color: 'text-red-500',     bg: 'bg-red-50',     route: '/page/admin/rejected-applications' },
    { label: 'Uploaded Documents',  value: uploadedDocs,                                  icon: CheckCircle,  color: 'text-[#0197E0]',    bg: 'bg-blue-50',    route: '/page/admin/uploaded-documents'    },
    { label: 'Pending Documents',   value: pendingDocs,                                   icon: Clock,        color: 'text-rose-500',    bg: 'bg-rose-50',    route: '/page/admin/pending-documents'     },
    { label: 'Approved',            value: stats.approved  ?? 0,                          icon: CreditCard,   color: 'text-[#0197E0]', bg: 'bg-blue-50', route: '/page/admin/approved-loans'        },
    { label: 'Disbursed',           value: stats.disbursed ?? 0,                          icon: TrendingUp,   color: 'text-purple-500',  bg: 'bg-purple-50',  route: '/page/admin/disbursed-loans'       },
  ];

  return (
    <AdminLayout title="Welcome Back, Admin" subtitle="Here's what's happening with your platform today.">

      {/* Error Banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={refresh} className="ml-auto flex items-center gap-1.5 font-bold hover:underline">
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((stat, i) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={i}
              onClick={() => navigate(stat.route)}
              className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-50 card-hover cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg}`}>
                <IconComponent className={stat.color} size={20} />
              </div>
              <p className="text-xs font-medium text-gray-500 mb-1">{stat.label}</p>
              {loading ? (
                <div className="h-7 w-12 bg-gray-100 rounded-lg animate-pulse" />
              ) : (
                <p className="text-xl font-bold text-[#1a237e]">{stat.value}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Refresh Buttons Row */}
      <div className="flex flex-wrap items-center gap-4 justify-end mb-2">
        {/* Refresh Token Button */}
        <div className="flex items-center gap-3">
          {tokenMsg && (
            <span className={`text-sm font-medium ${tokenMsg.startsWith('✓') ? 'text-green-600' : 'text-red-500'}`}>
              {tokenMsg}
            </span>
          )}
          <button
            onClick={handleRefreshToken}
            disabled={tokenRefreshing}
            title="Refresh your access token using the refresh token"
            className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-[#0197E0] to-[#0155AD] px-4 py-2 rounded-xl hover:shadow-md transition-all disabled:opacity-50"
          >
            <ShieldCheck size={15} className={tokenRefreshing ? 'animate-pulse' : ''} />
            {tokenRefreshing ? 'Refreshing...' : 'Refresh Token'}
          </button>
        </div>

        {/* Refresh Data Button */}
        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#1a237e] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
    </AdminLayout>
  );
}
