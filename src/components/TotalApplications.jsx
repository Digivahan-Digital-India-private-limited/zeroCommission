import React from 'react';
import AdminPageWrapper from './AdminPageWrapper';
import { useAdmin } from './AdminContext';

export default function TotalApplications() {
  const { applications } = useAdmin();
  return (
    <AdminPageWrapper
      title="Total Applications"
      subtitle="All applications submitted to the platform"
      applications={applications}
    />
  );
}
