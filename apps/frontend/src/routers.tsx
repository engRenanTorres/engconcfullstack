import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SignupPage } from './pages/SignupPage';
import Home from './pages/Home';
import PrivateRoutes from './utils/PrivateRoutes';
import { DashboardPage } from './pages/DashboardPage';
import { AuthProvider } from './contexts/AuthContext';
import { UnderConstructionPage } from './pages/UnderConstructionPage copy';

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes role={[1, 2, 3]} />}>
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="underConstruction" element={<UnderConstructionPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
