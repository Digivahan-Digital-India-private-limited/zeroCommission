import React from 'react';
import AdminPageWrapper from './AdminPageWrapper';
import { useAdmin } from './AdminContext';

export default function ApprovedLoans() {
  const { applications } = useAdmin();
  const approvedApps = applications.filter(a => a.status === 'Approved');
  return (
    <AdminPageWrapper
      title="Approved Loans"
      subtitle="Applications that have been approved"
      applications={approvedApps}
    />
  );
}
