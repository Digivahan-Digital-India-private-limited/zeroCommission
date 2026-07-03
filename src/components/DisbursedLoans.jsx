import React from 'react';
import AdminPageWrapper from './AdminPageWrapper';
import { useAdmin } from './AdminContext';

export default function DisbursedLoans() {
  const { applications } = useAdmin();
  const disbursedApps = applications.filter(a => a.status === 'Disbursed');
  return (
    <AdminPageWrapper
      title="Disbursed Loans"
      subtitle="Applications where funds have been successfully disbursed"
      applications={disbursedApps}
    />
  );
}
