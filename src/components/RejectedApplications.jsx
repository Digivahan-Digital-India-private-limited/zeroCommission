import React from 'react';
import AdminPageWrapper from './AdminPageWrapper';
import { useAdmin } from './AdminContext';

export default function RejectedApplications() {
  const { applications } = useAdmin();
  const rejectedApps = applications.filter(a => a.status === 'Rejected');
  return (
    <AdminPageWrapper
      title="Rejected Applications"
      subtitle="Applications that have been declined"
      applications={rejectedApps}
    />
  );
}
