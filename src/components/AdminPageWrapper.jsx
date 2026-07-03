import React from 'react';
import AdminLayout from './AdminLayout';
import ApplicationList from './ApplicationList';
import { useAdmin } from './AdminContext';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

function AdminPageWrapper({ title, subtitle, applications }) {
  const { loading, error, refresh } = useAdmin();
  return (
    <AdminLayout title={title} subtitle={subtitle} showBack={true}>
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 size={32} className="animate-spin mr-3" />
          <span className="font-medium">Loading applications...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle size={40} className="text-red-400 mb-3" />
          <p className="text-gray-500 font-medium mb-4">{error}</p>
          <button onClick={refresh} className="flex items-center gap-2 px-5 py-2.5 bg-[#1a237e] text-white rounded-xl font-bold hover:bg-[#283593] transition-colors">
            <RefreshCw size={15} /> Retry
          </button>
        </div>
      ) : (
        <ApplicationList title={`${title} — ${applications.length} record(s)`} applications={applications} />
      )}
    </AdminLayout>
  );
}

export default AdminPageWrapper;
