import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../pages/dashboard/Dashboard';
import UserManagement from '../pages/users/UserManagement';
import EditUser from '../pages/users/EditUser';
import Login from '../pages/auth/Login';
import NotFound from '../pages/NotFound';
import RoleManagement from '../pages/role/RoleManagement';
import CreateRole from '../pages/role/CreateRole';
import RoleDetails from '../pages/role/RoleDetails';
import WorkFlow from '../pages/workFlow/WorkFlow';
import CreateWorkFlow from '../pages/workFlow/CreateWorkFlow';
import EntityManagement from '../pages/entity/EntityManagement';
import EntityDetails from '../pages/entity/EntityDetails';
import EditEntity from '../pages/entity/EditEntity';
import RiskControl from '../pages/risk/RiskControl';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        }
      /> 

       <Route
        path="/users/:id"
        element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        }
      />

      <Route
        path="/roles"
        element={
          <PrivateRoute>
            <RoleManagement />
          </PrivateRoute>
        }
      />

      <Route
        path="/roles/create"
        element={
          <PrivateRoute>
            <CreateRole />
          </PrivateRoute>
        }
      />

      <Route
        path="/roles/:id"
        element={
          <PrivateRoute>
            <RoleDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/workflow"
        element={
          <PrivateRoute>
            <WorkFlow />
          </PrivateRoute>
        }
      />

      <Route
        path="/workflow/create"
        element={
          <PrivateRoute>
            <CreateWorkFlow />
          </PrivateRoute>
        }
      />

      <Route
        path="/entity"
        element={
          <PrivateRoute>
            <EntityManagement />
          </PrivateRoute>
        }
      />

      <Route
        path="/entity/:id"
        element={
          <PrivateRoute>
            <EntityDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/entity/:id/edit"
        element={
          <PrivateRoute>
            <EditEntity />
          </PrivateRoute>
        }
      />

      <Route
        path="/risks"
        element={
          <PrivateRoute>
            <RiskControl />
          </PrivateRoute>
        }
      /> 

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
