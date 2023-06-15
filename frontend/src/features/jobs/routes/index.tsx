import { Navigate, Route, Routes } from 'react-router-dom';

import { Jobs } from './Jobs';

export const JobsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Jobs />} />
      <Route path=":id" element={<Jobs />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
