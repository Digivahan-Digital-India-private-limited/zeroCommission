import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  ArrowLeft,
  Users,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  CreditCard,
  FileText,
  Download,
  Printer,
  FileCheck,
  Trash2,
  ChevronDown,
  RefreshCw,
  MessageSquare,
  Calendar,
  Hash,
  Loader2,
  AlertCircle,
  ExternalLink,
  IndianRupee,
  Building2,
  ClipboardList,
} from 'lucide-react';
import { useAdmin } from './AdminContext';
import {
  getDocumentDetailsNextPay,
  updateDocumentStatusNextPay,
  updateLoanStatusNextPay,
  exportApplicationsNextPay,
} from '../services/loanService';

const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://zerocommission-backend.onrender.com' : 'http://localhost:5000');

// ─── Documents Tab Sub-Component (NextPay API) ─────────────────────────
function DocumentsTab({ app }) {
  const loanId = app?.id;
  const loanApplicationId = app?.rawId || loanId;

  const [docData, setDocData] = useState(null);
  const [docsLoading, setDocsLoading] = useState(true);
  const [docsError, setDocsError] = useState('');

  const [docStatus, setDocStatus] = useState('');
  const [docRemarks, setDocRemarks] = useState('');
  const [docStatusSaving, setDocStatusSaving] = useState(false);
  const [docStatusMsg, setDocStatusMsg] = useState('');

  const { changeDocsStatus } = useAdmin();

  const fetchDocs = async () => {
    setDocsLoading(true);
    setDocsError('');
    try {
      const res = await getDocumentDetailsNextPay(loanApplicationId);
      setDocData(res.data);
      setDocStatus(res.data?.document_status || '');
      setDocRemarks(res.data?.remarks || '');
    } catch (err) {
      setDocsError(err.message || 'Failed to load document details.');
    } finally {
      setDocsLoading(false);
    }
  };

  useEffect(() => { fetchDocs(); }, [loanApplicationId]);

  const handleDocStatusUpdate = async () => {
    if (!docStatus) return;
    setDocStatusSaving(true);
    setDocStatusMsg('');
    try {
      await updateDocumentStatusNextPay(loanApplicationId, docStatus, docRemarks);
      changeDocsStatus(loanId, docStatus);
      setDocStatusMsg('✓ Document status updated successfully!');
    } catch (err) {
      setDocStatusMsg('✗ ' + (err.message || 'Failed to update'));
    } finally {
      setDocStatusSaving(false);
      setTimeout(() => setDocStatusMsg(''), 4000);
    }
  };

  if (docsLoading) return (
    <div className="p-8 flex items-center justify-center py-16 text-gray-400">
      <Loader2 size={28} className="animate-spin mr-3" /> Loading document details...
    </div>
  );

  if (docsError) return (
    <div className="p-8 flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle size={36} className="text-red-300 mb-3" />
      <p className="text-gray-500 mb-3">{docsError}</p>
      <button onClick={fetchDocs} className="flex items-center gap-2 px-4 py-2 bg-[#1a237e] text-white rounded-xl font-bold text-sm">
        <RefreshCw size={14} /> Retry
      </button>
    </div>
  );

  let docs = [];
  if (Array.isArray(docData?.documents)) {
    docs = docData.documents;
  } else if (Array.isArray(docData)) {
    docs = docData;
  } else if (docData && typeof docData === 'object') {
    if (docData.pancard_url) {
      docs.push({
        document_type: 'PAN Card',
        file_url: docData.pancard_url,
        file_name: 'PAN_Card_Document',
        uploaded_at: docData.uploaded_at
      });
    }
    if (docData.adharcard_url) {
      docs.push({
        document_type: 'Aadhaar Card',
        file_url: docData.adharcard_url,
        file_name: 'Aadhaar_Card_Document',
        uploaded_at: docData.uploaded_at
      });
    }
  }

  return (
    <div className="p-8 animate-in fade-in duration-300 space-y-8">
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
        <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ClipboardList size={18} className="text-[#0197E0]" /> Update Document Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Document Status</label>
            <select
              value={docStatus}
              onChange={e => setDocStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#1a237e] font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0197E0]"
            >
              <option value="">-- Select --</option>
              <option value="RECEIVED">RECEIVED</option>
              <option value="PENDING">PENDING</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Remarks</label>
            <input
              type="text"
              value={docRemarks}
              onChange={e => setDocRemarks(e.target.value)}
              placeholder="Add remarks (optional)"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0197E0]"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleDocStatusUpdate}
            disabled={docStatusSaving || !docStatus}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0197E0] to-[#0155AD] text-white rounded-xl font-bold text-sm hover:shadow-md transition-all disabled:opacity-50"
          >
            {docStatusSaving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
            {docStatusSaving ? 'Saving...' : 'Save Document Status'}
          </button>
          {docStatusMsg && (
            <span className={`text-sm font-medium ${docStatusMsg.startsWith('✓') ? 'text-green-600' : 'text-red-500'}`}>
              {docStatusMsg}
            </span>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-800">Uploaded Documents</h3>
          <span className="px-3 py-1 bg-blue-50 text-[#0155AD] rounded-lg text-xs font-bold">{docs.length} file(s)</span>
        </div>

        {docs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400 bg-gray-50 rounded-2xl">
            <FileCheck size={48} className="mb-3 text-gray-200" />
            <p className="font-bold text-gray-500">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {docs.map((doc, idx) => {
              const fileUrl = doc.file_url || doc.url || doc.path || '';
              const fileName = doc.file_name || doc.name || doc.originalName || `Document ${idx + 1}`;
              const docType = doc.document_type || doc.docName || doc.category || 'Document';
              const uploadedAt = doc.uploaded_at || doc.uploadedAt || '';
              const isImg = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);
              const isPdf = /\.pdf$/i.test(fileUrl);
              return (
                <div key={idx} className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-4 rounded-2xl hover:border-blue-200 transition-all">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-200 flex items-center justify-center">
                    {isImg
                      ? <img src={fileUrl} alt={fileName} className="w-full h-full object-cover" />
                      : isPdf
                        ? <FileText size={24} className="text-red-400" />
                        : <FileCheck size={24} className="text-[#0197E0]" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#1a237e] text-sm truncate">{docType}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{fileName}</p>
                    {uploadedAt && <p className="text-xs text-gray-400">{new Date(uploadedAt).toLocaleDateString('en-IN')}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {fileUrl && (
                      <button onClick={() => window.open(fileUrl, '_blank')}
                        className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-[#0176C7] hover:border-[#0197E0] transition-colors shadow-sm"
                        title="View">
                        <ExternalLink size={15} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Status Badge Helper ───────────────────────────────────────────────────
function StatusBadge({ status, size = 'sm' }) {
  const map = {
    Approved: 'bg-blue-100 text-[#0155AD]',
    Disbursed: 'bg-purple-100  text-purple-700',
    Rejected: 'bg-red-100     text-red-700',
    Viewed: 'bg-indigo-100  text-indigo-700',
    Pending: 'bg-amber-100   text-amber-700',
  };
  const cls = map[status] || 'bg-gray-100 text-gray-700';
  return (
    <span className={`${cls} px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide ${size === 'lg' ? 'text-sm px-4 py-2' : ''}`}>
      {status}
    </span>
  );
}

// ─── Confirm Delete Dialog ─────────────────────────────────────────────────
function ConfirmDialog({ name, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-7 text-center">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={26} className="text-red-500" />
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">Delete Application?</h3>
        <p className="text-gray-500 text-sm mb-6">
          This will permanently delete <strong>{name}</strong>'s application. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── Re-Export Confirm Modal ───────────────────────────────────────────────
function ReExportModal({ target, onExportFresh, onExportAll, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7">
        <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Download size={26} className="text-amber-500" />
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-1 text-center">Already Exported</h3>
        <p className="text-gray-500 text-sm mb-4 text-center">
          {target.alreadyExported.length} application(s) were already exported before:
        </p>

        {/* Already exported list */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 max-h-36 overflow-y-auto space-y-1.5">
          {target.alreadyExported.map(app => (
            <div key={app.id} className="flex items-center gap-2 text-sm">
              <CheckCircle size={12} className="text-amber-500 flex-shrink-0" />
              <span className="font-semibold text-gray-700">{app.name}</span>
              <span className="text-gray-400 text-xs font-mono ml-auto">{app.id}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-5 text-center">
          Do you want to re-export <strong>all {target.allSelected.length}</strong> selected, or only the{' '}
          <strong>{target.freshApps.length} new</strong> one(s)?
        </p>

        <div className="flex flex-col gap-2">
          {target.freshApps.length > 0 && (
            <button
              onClick={onExportFresh}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#0197E0] text-white font-bold text-sm hover:bg-[#0176C7] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              Export only new ({target.freshApps.length})
            </button>
          )}
          <button
            onClick={onExportAll}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            Re-export all ({target.allSelected.length})
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

import * as XLSX from 'xlsx';

// ─── Main Component ────────────────────────────────────────────────────────
export default function ApplicationList({ title, applications, defaultOpenDocs = false }) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusChanging, setStatusChanging] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [statusSummary, setStatusSummary] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());

  // ── Export state ──────────────────────────────────────────────────────────
  const [exportedIds, setExportedIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('exportedAppIds') || '[]')); }
    catch { return new Set(); }
  });
  const [reExportTarget, setReExportTarget] = useState(null); // { allSelected, alreadyExported, freshApps }
  const [exportLoading, setExportLoading] = useState(false);
  const [exportMsg, setExportMsg] = useState('');

  const { markAsViewed, toggleView, changeStatus, removeApplication } = useAdmin();

  // ── Core export action ────────────────────────────────────────────────────
  const doExport = async (appsToExport) => {
    setExportLoading(true);
    setExportMsg('');
    try {
      const ids = appsToExport.map(app => Number(app.rawId || app.id)).filter(Boolean);
      await exportApplicationsNextPay(ids);

      // Mark all exported ids in localStorage
      const newExported = new Set(exportedIds);
      appsToExport.forEach(app => newExported.add(String(app.rawId || app.id)));
      setExportedIds(newExported);
      localStorage.setItem('exportedAppIds', JSON.stringify([...newExported]));

      setExportMsg(`✓ ${appsToExport.length} application(s) exported successfully`);
      setTimeout(() => setExportMsg(''), 4000);
    } catch (err) {
      setExportMsg('✗ Export failed: ' + err.message);
      setTimeout(() => setExportMsg(''), 5000);
    } finally {
      setExportLoading(false);
      setReExportTarget(null);
      setSelectedIds(new Set());
    }
  };

  // ── Export button click ───────────────────────────────────────────────────
  const handleExportSelected = () => {
    if (selectedIds.size === 0) return;

    const selectedApps = applications.filter(app => selectedIds.has(app.id));
    const alreadyExported = selectedApps.filter(app => exportedIds.has(String(app.rawId || app.id)));
    const freshApps = selectedApps.filter(app => !exportedIds.has(String(app.rawId || app.id)));

    if (alreadyExported.length > 0) {
      // Show re-export modal
      setReExportTarget({ allSelected: selectedApps, alreadyExported, freshApps });
      return;
    }

    // All fresh — export directly
    doExport(selectedApps);
  };

  const handleView = async (row) => {
    setSelectedApp(row);
    if (!row.viewed) {
      await toggleView(row.id, true, row.rawId);
    }
    setActiveDetailTab(defaultOpenDocs ? 'documents' : 'overview');
  };

  const handleToggleEye = async (e, row) => {
    e.stopPropagation();
    await toggleView(row.id, !row.viewed, row.rawId);
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedApp) return;
    setStatusChanging(true);
    setStatusMsg('');
    try {
      const loanId = selectedApp.rawId || selectedApp.token;
      const response = await updateLoanStatusNextPay(loanId, newStatus, statusSummary);
      changeStatus(selectedApp.token, newStatus);
      setSelectedApp(prev => ({ ...prev, status: newStatus }));
      setStatusMsg(`✓ Status updated to ${newStatus}`);
      setStatusSummary('');
    } catch (err) {
      setStatusMsg('✗ ' + (err.response?.data?.message || err.message || 'Failed to update status'));
    } finally {
      setStatusChanging(false);
      setTimeout(() => setStatusMsg(''), 5000);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const loanId = deleteTarget.rawId || deleteTarget.token;
    await removeApplication(deleteTarget.token, loanId);
    setDeleteTarget(null);
    if (selectedApp?.token === deleteTarget.token) setSelectedApp(null);
  };

  const filteredApps = applications.filter(app => {
    const term = searchTerm.toLowerCase();
    return (
      app.name?.toLowerCase().includes(term) ||
      app.id?.toLowerCase().includes(term) ||
      app.phone?.includes(term) ||
      app.email?.toLowerCase().includes(term)
    );
  });

  // ── Select All — skips already-exported apps ──────────────────────────────
  const nonExportedApps = filteredApps.filter(app => !exportedIds.has(String(app.rawId || app.id)));
  const isAllSelected = nonExportedApps.length > 0 && nonExportedApps.every(app => selectedIds.has(app.id));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select only apps that haven't been exported yet
      const newIds = new Set(nonExportedApps.map(app => app.id));
      setSelectedIds(newIds);
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // ─── Detail View ─────────────────────────────────────────────────────────
  if (selectedApp) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-50 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-4 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-[#1a237e]">Token: {selectedApp.token}</h2>
              <p className="text-sm text-gray-500">Submitted on {selectedApp.date}</p>
            </div>
          </div>

          <div className="flex bg-gray-200/50 p-1 rounded-xl md:ml-6 mt-4 md:mt-0">
            {['overview', 'documents'].map(tab => (
              <button key={tab} onClick={() => setActiveDetailTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors capitalize ${activeDetailTab === tab ? 'bg-white text-[#1a237e] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="md:ml-auto mt-4 md:mt-0 flex items-center gap-3">
            <StatusBadge status={selectedApp.status} size="lg" />
            <button onClick={() => setDeleteTarget(selectedApp)}
              className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-500 transition-colors" title="Delete Application">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeDetailTab === 'overview' && (
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Applicant Information</h3>
              {[
                { icon: Users, bg: 'bg-blue-50', color: 'text-blue-500', label: 'Full Name', value: selectedApp.name },
                { icon: Phone, bg: 'bg-blue-50', color: 'text-[#0197E0]', label: 'Phone Number', value: selectedApp.phone },
                { icon: Mail, bg: 'bg-amber-50', color: 'text-amber-500', label: 'Email Address', value: selectedApp.email },
                { icon: Hash, bg: 'bg-indigo-50', color: 'text-indigo-500', label: 'App Token', value: selectedApp.token },
                { icon: Calendar, bg: 'bg-purple-50', color: 'text-purple-500', label: 'Submitted On', value: selectedApp.date },
              ].map(({ icon: Icon, bg, color, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center ${color}`}><Icon size={18} /></div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{label}</p>
                    <p className="text-base font-bold text-[#1a237e]">{value || '—'}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Loan Request Details</h3>
              {[
                { icon: Briefcase, bg: 'bg-indigo-50', color: 'text-indigo-500', label: 'Loan Type', value: selectedApp.loanType },
                { icon: IndianRupee, bg: 'bg-green-50', color: 'text-green-500', label: 'Loan Amount', value: selectedApp.amount },
                { icon: Building2, bg: 'bg-gray-50', color: 'text-gray-500', label: 'City', value: selectedApp.city },
                { icon: Briefcase, bg: 'bg-indigo-50', color: 'text-indigo-500', label: 'Profession', value: selectedApp.profession },
                { icon: FileText, bg: 'bg-rose-50', color: 'text-rose-500', label: 'Documents', value: selectedApp.docs },
              ].map(({ icon: Icon, bg, color, label, value }) => value && value !== '—' ? (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center ${color}`}><Icon size={18} /></div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{label}</p>
                    <p className="text-base font-bold text-[#1a237e]">{value}</p>
                  </div>
                </div>
              ) : null)}

              {selectedApp.message && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 flex-shrink-0"><MessageSquare size={18} /></div>
                  <div className="bg-gray-50 rounded-2xl p-4 flex-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Message from Applicant</p>
                    <p className="text-sm font-medium text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedApp.message}</p>
                  </div>
                </div>
              )}

              {(selectedApp.remarks || selectedApp.summary) && (
                <div className="flex items-start gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0197E0] flex-shrink-0"><FileText size={18} /></div>
                  <div className="bg-blue-50/50 rounded-2xl p-4 flex-1 border border-blue-100">
                    <p className="text-xs text-[#0197E0] font-bold uppercase tracking-wider mb-1">Remarks (Admin)</p>
                    <p className="text-sm font-medium text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedApp.remarks || selectedApp.summary}</p>
                  </div>
                </div>
              )}

              {/* Status Actions */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Update Status</p>
                <div className="mb-3">
                  <input
                    type="text"
                    value={statusSummary}
                    onChange={e => setStatusSummary(e.target.value)}
                    placeholder="Remarks (optional)"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0197E0]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Approve', status: 'Approved', cls: 'bg-[#0197E0] hover:bg-[#0176C7] text-white' },
                    { label: 'Reject', status: 'Rejected', cls: 'bg-red-500 hover:bg-red-600 text-white' },
                    { label: 'Disburse', status: 'Disbursed', cls: 'bg-purple-500 hover:bg-purple-600 text-white' },
                    { label: 'Pending', status: 'Pending', cls: 'bg-amber-500 hover:bg-amber-600 text-white' },
                  ].map(({ label, status, cls }) => (
                    <button key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={statusChanging || selectedApp.status === status}
                      className={`py-2.5 rounded-xl font-bold text-sm transition-all ${cls} disabled:opacity-40 disabled:cursor-not-allowed`}>
                      {statusChanging ? <RefreshCw size={14} className="animate-spin inline mr-1" /> : null}
                      {label}
                    </button>
                  ))}
                </div>
                {statusMsg && (
                  <p className={`text-sm font-medium mt-3 ${statusMsg.startsWith('✓') ? 'text-green-600' : 'text-red-500'}`}>{statusMsg}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeDetailTab === 'documents' && <DocumentsTab app={selectedApp} />}

        {deleteTarget && (
          <ConfirmDialog name={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
        )}
      </div>
    );
  }

  // ─── List View ────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-50 overflow-hidden">
      {/* Toolbar */}
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4 bg-gray-50/50">
        <h2 className="text-xl font-bold text-[#1a237e]">{title}</h2>
        <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">

          {/* Export button — shows only when rows are selected */}
          {selectedIds.size > 0 && (
            <button
              onClick={handleExportSelected}
              disabled={exportLoading}
              className="flex items-center gap-2 px-4 py-2 bg-[#0197E0] text-white rounded-lg font-bold text-sm hover:bg-[#0176C7] transition-colors shadow-sm disabled:opacity-60"
            >
              {exportLoading
                ? <Loader2 size={16} className="animate-spin" />
                : <Download size={16} />}
              {exportLoading ? 'Exporting...' : `Export Selected (${selectedIds.size})`}
            </button>
          )}

          {/* Export success / error message */}
          {exportMsg && (
            <span className={`text-sm font-semibold ${exportMsg.startsWith('✓') ? 'text-green-600' : 'text-red-500'}`}>
              {exportMsg}
            </span>
          )}

          <input
            type="text"
            placeholder="Search name, token or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0197E0] w-full md:w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white text-gray-500 text-sm border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium w-10">
                {/* Select All — only ticks non-exported */}
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  disabled={nonExportedApps.length === 0}
                  className="w-4 h-4 text-[#0197E0] rounded border-gray-300 focus:ring-[#0197E0] disabled:opacity-40"
                  title={nonExportedApps.length === 0 ? 'All applications already exported' : 'Select all unexported'}
                />
              </th>
              <th className="px-6 py-4 font-medium">Token</th>
              <th className="px-6 py-4 font-medium">Applicant</th>
              <th className="px-6 py-4 font-medium">Loan Type</th>
              <th className="px-6 py-4 font-medium">Documents</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredApps.map((row, i) => {
              const isExported = exportedIds.has(String(row.rawId || row.id));
              return (
                <tr key={i} className={`transition-colors ${isExported ? 'bg-green-50/40' : 'hover:bg-gray-50/50'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {isExported && (
                        <span
                          title="Already exported"
                          className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 flex-shrink-0"
                        >
                          <CheckCircle size={13} />
                        </span>
                      )}
                      <input
                        type="checkbox"
                        checked={selectedIds.has(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="w-4 h-4 text-[#0197E0] rounded border-gray-300 focus:ring-[#0197E0]"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gray-500 text-xs">{row.id}</span>
                      {isExported && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-700 uppercase tracking-wide">
                          Exported
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#1a237e]">{row.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{row.phone}</p>
                    <p className="text-gray-400 text-xs">{row.email !== '—' ? row.email : ''}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700 text-xs">{row.loanType}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${row.docs === 'Uploaded'
                      ? 'bg-blue-100 text-[#0155AD]'
                      : 'bg-amber-100 text-amber-700'
                      }`}>
                      {row.docs === 'Uploaded' ? <CheckCircle size={11} /> : <Clock size={11} />}
                      {row.docs === 'Uploaded' ? `${row.documentsCount} file(s)` : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => handleToggleEye(e, row)}
                        className={`inline-flex items-center justify-center p-2 rounded-lg border shadow-sm cursor-pointer transition-colors
                          ${row.viewed
                            ? 'bg-blue-50 text-[#0197E0] border-transparent hover:bg-blue-100'
                            : 'bg-white text-gray-400 border-gray-200 hover:text-[#0197E0]'}`}
                        title={row.viewed ? 'Mark as unviewed' : 'Mark as viewed'}>
                        {row.viewed ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button
                        onClick={() => handleView(row)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#1a237e] hover:border-[#1a237e]/30 font-bold text-xs transition-colors shadow-sm"
                      >
                        Open Details
                      </button>
                      <button
                        onClick={() => setDeleteTarget(row)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors border border-transparent hover:border-red-100"
                        title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredApps.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <p>Showing {filteredApps.length} of {applications.length} entries</p>
        {exportedIds.size > 0 && (
          <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
            <CheckCircle size={12} /> {exportedIds.size} exported in this session
          </p>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <ConfirmDialog name={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {/* Re-Export Modal */}
      {reExportTarget && (
        <ReExportModal
          target={reExportTarget}
          loading={exportLoading}
          onExportFresh={() => doExport(reExportTarget.freshApps)}
          onExportAll={() => doExport(reExportTarget.allSelected)}
          onCancel={() => setReExportTarget(null)}
        />
      )}
    </div>
  );
}