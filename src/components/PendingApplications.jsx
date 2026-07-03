import React from 'react';
import AdminPageWrapper from './AdminPageWrapper';
import { useAdmin } from './AdminContext';

export default function PendingApplications() {
  const { applications } = useAdmin();
  const pendingApps = applications.filter(a => a.status === 'Pending');
  return (
    <AdminPageWrapper
      title="Pending Applications"
      subtitle="Applications waiting for admin review"
      applications={pendingApps}
    />
  );
}
