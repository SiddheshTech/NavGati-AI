/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import { motion, useScroll, useSpring } from 'motion/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Platform from './pages/Platform';
import Solutions from './pages/Solutions';
import Industries from './pages/Industries';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import SuperAdminDashboard from './pages/dashboards/SuperAdminDashboard';

import CompanyAdminDashboard from './pages/dashboards/CompanyAdminDashboard';
import OperationsManagerDashboard from './pages/dashboards/OperationsManagerDashboard';
import AnalystDashboard from './pages/dashboards/AnalystDashboard';
import FieldExecutiveDashboard from './pages/dashboards/FieldExecutiveDashboard';
import ViewerDashboard from './pages/dashboards/ViewerDashboard';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAuth = location.pathname === '/auth';
  const hideLayout = isDashboard || isAuth;

  return (
    <ToastProvider>
      <main className="min-h-screen selection:bg-blue-500/30">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[60]"
          style={{ scaleX }}
        />
        
        {!hideLayout && <Navbar />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/dashboard/company-admin" element={<CompanyAdminDashboard />} />
          <Route path="/dashboard/operations-manager" element={<OperationsManagerDashboard />} />
          <Route path="/dashboard/analyst" element={<AnalystDashboard />} />
          <Route path="/dashboard/field-executive" element={<FieldExecutiveDashboard />} />
          <Route path="/dashboard/viewer" element={<ViewerDashboard />} />
        </Routes>

        {/* Decorative background elements */}
        {!hideLayout && (
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
          </div>
        )}

        {!hideLayout && (
          <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm z-20 relative bg-[#020617]">
            <p>© 2026 NavGati AI Technologies Inc. All rights reserved.</p>
          </footer>
        )}
      </main>
    </ToastProvider>
  );
}

