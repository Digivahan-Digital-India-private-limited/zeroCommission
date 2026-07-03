import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  getAllLoanApplicationsNextPay,
  updateApplicationStatus,
  deleteApplication,
  getApplicationStats,
} from '../services/loanService';

const AdminContext = createContext();

// ─── Normalize NextPay API data to match UI shape ──────────────────────────
const normalize = (app) => {
  let dateStr = '—';
  try {
    dateStr = new Date(app.applied_time || app.submittedAt).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch (_) {}

  const docStatus = (app.Document_Status || app.docsStatus || 'PENDING').toUpperCase();
  const appStatus = (app.status || 'Pending');
  // Capitalize first letter for UI consistency
  const statusFormatted = appStatus.charAt(0).toUpperCase() + appStatus.slice(1).toLowerCase();

  return {
    id: app.application_token || app.token,
    rawId: app.id,  // numeric database ID for NextPay feature APIs
    token: app.application_token || app.token,
    name: app.name || '—',
    phone: app.number || app.phone || '—',
    email: app.email || '—',
    loanType: app.loan_type || app.loan || '—',
    loan: app.loan_type || app.loan || '—',
    loanAmount: app.loan_amount || '—',
    city: app.city || '—',
    profession: app.profession || '—',
    businessName: app.business_name || '',
    message: app.case_history || '',
    docs: docStatus === 'RECEIVED' ? 'Uploaded' : 'Pending',
    docsStatus: docStatus === 'RECEIVED' ? 'Uploaded' : 'Pending',
    documentsCount: 0,
    status: statusFormatted,
    viewed: !!app.is_viewed,
    date: dateStr,
    address: app.city || '—',
    amount: app.loan_amount ? `₹${parseFloat(app.loan_amount).toLocaleString('en-IN')}` : '—',
    batchNo: app.batch_no || '',
    summary: app.summary || app.admin_summary || app.remarks || '',
  };
};

export function AdminProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const fetchAll = async () => {
    if (!isMounted.current) return;
    setLoading(true);
    setError('');
    try {
      const appsRes = await getAllLoanApplicationsNextPay({ limit: 500 });

      if (!isMounted.current) return;

      const rawApps = appsRes?.data;
      if (Array.isArray(rawApps)) {
        setApplications(rawApps.map(normalize));
        // Derive stats from data
        const total = rawApps.length;
        const pending  = rawApps.filter(a => (a.status || '').toUpperCase() === 'PENDING').length;
        const approved = rawApps.filter(a => (a.status || '').toUpperCase() === 'APPROVED').length;
        const rejected = rawApps.filter(a => (a.status || '').toUpperCase() === 'REJECTED').length;
        const disbursed = rawApps.filter(a => (a.status || '').toUpperCase() === 'DISBURSED').length;
        setStats({ total, pending, approved, rejected, disbursed });
      } else {
        setApplications([]);
      }
    } catch (err) {
      if (!isMounted.current) return;
      console.error('AdminContext fetchAll error:', err);
      setError(err.message || 'Failed to fetch applications from server.');
      setApplications([]);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  // Fetch only once on mount
  useEffect(() => {
    fetchAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const markAsViewed = (id) => {
    setApplications(prev =>
      prev.map(app => app.id === id ? { ...app, viewed: true } : app)
    );
  };

  const toggleView = async (token, newViewStatus, rawId) => {
    try {
      if (newViewStatus && rawId) {
        const { openApplicationNextPay } = await import('../services/loanService');
        await openApplicationNextPay(rawId);
      } else {
        const { toggleApplicationView } = await import('../services/loanService');
        await toggleApplicationView(token, newViewStatus);
      }
      setApplications(prev =>
        prev.map(app => app.id === token ? { ...app, viewed: newViewStatus } : app)
      );
      // Refresh stats only
      const statsRes = await getApplicationStats();
      if (isMounted.current) setStats(statsRes?.data || {});
    } catch (err) {
      alert('Failed to toggle view status: ' + err.message);
    }
  };

  const changeStatus = (token, newStatus) => {
    setApplications(prev =>
      prev.map(app => app.id === token ? { ...app, status: newStatus } : app)
    );
  };

  const changeDocsStatus = (token, newDocsStatus) => {
    setApplications(prev =>
      prev.map(app => app.id === token ? { ...app, docsStatus: newDocsStatus === 'RECEIVED' ? 'Uploaded' : 'Pending', docs: newDocsStatus === 'RECEIVED' ? 'Uploaded' : 'Pending' } : app)
    );
  };

  const removeApplication = async (token, rawId) => {
    try {
      if (rawId) {
        const { deleteLoanApplicationNextPay } = await import('../services/loanService');
        await deleteLoanApplicationNextPay(rawId);
      } else {
        const { deleteApplication } = await import('../services/loanService');
        await deleteApplication(token);
      }
      setApplications(prev => prev.filter(app => app.id !== token));
      const statsRes = await getApplicationStats();
      if (isMounted.current) setStats(statsRes?.data || {});
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  return (
    <AdminContext.Provider value={{
      applications,
      stats,
      loading,
      error,
      refresh: fetchAll,
      markAsViewed,
      toggleView,
      changeStatus,
      changeDocsStatus,
      removeApplication
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
