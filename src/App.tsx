import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import StudentDashboard from './components/student/Dashboard';
import TeacherDashboard from './components/teacher/Dashboard';
import AdminDashboard from './components/admin/Dashboard';

function AuthWrapper() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return isLogin ? (
      <LoginForm onToggleMode={() => setIsLogin(false)} />
    ) : (
      <SignupForm onToggleMode={() => setIsLogin(true)} />
    );
  }

  return (
    <Layout>
      <Routes>
        {/* Student Routes */}
        {user.role === 'student' && (
          <>
            <Route path="/student\" element={<StudentDashboard />} />
            <Route path="/student/*" element={<StudentDashboard />} />
            <Route path="/" element={<Navigate to="/student\" replace />} />
          </>
        )}
        
        {/* Teacher Routes */}
        {user.role === 'teacher' && (
          <>
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/*" element={<TeacherDashboard />} />
            <Route path="/" element={<Navigate to="/teacher\" replace />} />
          </>
        )}
        
        {/* Admin Routes */}
        {user.role === 'admin' && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/" element={<Navigate to="/admin\" replace />} />
          </>
        )}
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to={`/${user.role}`} replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthWrapper />
      </Router>
    </AuthProvider>
  );
}

export default App;