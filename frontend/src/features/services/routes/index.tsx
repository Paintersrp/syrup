import { Navigate, Route, Routes } from 'react-router-dom';

import { Services } from './Services';
import { Service } from './Service';

export const ServicesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Services />} />
      <Route path=":id" element={<Service />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
