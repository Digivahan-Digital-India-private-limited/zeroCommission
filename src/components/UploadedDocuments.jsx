import React from 'react';
import AdminPageWrapper from './AdminPageWrapper';
import { useAdmin } from './AdminContext';

export default function UploadedDocuments() {
  const { applications } = useAdmin();
  // Future: filter apps where actual docs were submitted
  // For now: Approved/Disbursed apps are considered to have docs
  const uploadedDocsApps = applications.filter(
    a => a.status === 'Approved' || a.status === 'Disbursed' || a.docs === 'Uploaded' || a.docs === 'Uploaded Documents'
  );
  return (
    <AdminPageWrapper
      title="Uploaded Documents"
      subtitle="Applications where documents have been submitted"
      applications={uploadedDocsApps}
    />
  );
}
