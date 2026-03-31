import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout    from './components/layout/AppLayout';
import Login        from './pages/Login';
import Landing      from './pages/Landing';
import Dashboard    from './pages/Dashboard';
import Upload       from './pages/Upload';
import Prediction   from './pages/Prediction';
import Recommendations from './pages/Recommendations';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ── */}
        <Route path="/"     element={<Login   />} />
        <Route path="/home" element={<Landing />} />

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