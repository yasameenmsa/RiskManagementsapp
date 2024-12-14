import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { RoleProvider } from './contexts/RoleContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RoleProvider>
          <Layout>
            <AppRoutes />
          </Layout>
          <Toaster position="top-right" />
        </RoleProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;