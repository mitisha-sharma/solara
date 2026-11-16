import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout    from './components/layout/AppLayout';
import Login        from './pages/Login';
import Journal      from './pages/Journal';
import Dashboard    from './pages/Dashboard';
import Upload       from './pages/Upload';
import Prediction   from './pages/Prediction';
import Recommendations from './pages/Recommendations';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        {/* ── Public ── */}
        <Route path="/"      element={<Journal />} />
        <Route path="/login" element={<Login   />} />
        <Route path="/home"  element={<Navigate to="/" replace />} />

        {/* ── App (with Navbar + Sidebar) ── */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard"       element={<Dashboard       />} />
          <Route path="/upload"          element={<Upload          />} />
          <Route path="/prediction"      element={<Prediction      />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Route>

        {/* ── Catch-all ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}