import React from 'react';
import AdminPageWrapper from './AdminPageWrapper';
import { useAdmin } from './AdminContext';

export default function UnviewedApplications() {
  const { applications } = useAdmin();
  const unviewedApps = applications.filter(app => !app.viewed);
  
  return (
    <AdminPageWrapper
      title="Unviewed Applications"
      subtitle="Applications that have not been viewed yet"
      applications={unviewedApps}
    />
  );
}
