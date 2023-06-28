import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SignupPage } from './pages/SignupPage';
import Home from './pages/Home';
import PrivateRoutes from './utils/PrivateRoutes';
import { DashboardPage } from './pages/DashboardPage';
import { AuthProvider } from './contexts/AuthContext';
import { UnderConstructionPage } from './pages/UnderConstructionPage copy';
import CreateQuestions from './pages/questions/CreateQuestions';
import ListQuestions from './pages/questions/ListQuestions';

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes role={[1, 2, 3]} />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="create-questions" element={<CreateQuestions />} />
          </Route>
          <Route path="questions">
            <Route element={<PrivateRoutes role={[1, 2, 3]} />}>
              <Route path="create" element={<CreateQuestions />} />
            </Route>
            <Route index element={<ListQuestions />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="under-construction"
            element={<UnderConstructionPage />}
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
