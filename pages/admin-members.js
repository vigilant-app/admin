import React from 'react';
import AdminMembers from '../components/AdminMembers';
import BreadCrumb from '../components/BreadCrumb';
import Welcome from '../components/Welcome';

export default function adminmembers() {
  return (
    <>
      <Welcome />
      <BreadCrumb
        tab={'adminMembers'}
        location={[{ link: '', location: 'Admin Members' }]}
      />
      <AdminMembers />
    </>
  );
}
