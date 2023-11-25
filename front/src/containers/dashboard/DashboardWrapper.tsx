// src/containers/DashboardWrapper.tsx
import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { Outlet } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { UserDashboard } from '..';

const DashboardWrapper = () => {
  const { user } = useUser();

  return (
    <>
      {user?.role === 'doctor' ? <AdminDashboard /> : <UserDashboard />}
      <Outlet />
    </>
  );
};

export default DashboardWrapper;
