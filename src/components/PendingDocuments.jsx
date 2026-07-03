import React from 'react';
import AdminPageWrapper from './AdminPageWrapper';
import { useAdmin } from './AdminContext';

export default function PendingDocuments() {
  const { applications } = useAdmin();
  // Pending apps or apps not yet approved/disbursed = docs pending
  const pendingDocsApps = applications.filter(
    a => a.status === 'Pending' || a.docs === 'Pending' || a.docs === 'Pending Documents'
  );
  return (
    <AdminPageWrapper
      title="Pending Documents"
      subtitle="Applications missing required documents"
      applications={pendingDocsApps}
    />
  );
}
