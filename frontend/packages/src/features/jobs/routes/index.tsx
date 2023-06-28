
import { Navigate, Route, Routes } from 'react-router-dom';

import { Jobs } from './Jobs';
import { Job } from './Job';

export const JobsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Jobs />} />
      <Route path=":id" element={<Job />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
