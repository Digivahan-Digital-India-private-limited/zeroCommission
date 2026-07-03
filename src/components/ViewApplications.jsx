import React from 'react';
import AdminPageWrapper from './AdminPageWrapper';
import { useAdmin } from './AdminContext';

export default function ViewApplications() {
  const { applications } = useAdmin();
  const viewedApps = applications.filter(a => a.viewed);
  return (
    <AdminPageWrapper
      title="Viewed Applications"
      subtitle="Applications that have been reviewed by admin"
      applications={viewedApps}
    />
  );
}
