import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <TaskProvider>
          <Toaster 
            position="top-right" 
            toastOptions={{ 
              duration: 2000,
              style: {
                background: '#ffffff',
                color: '#0F172A',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '16px',
                padding: '14px 20px',
                boxShadow: '0 10px 40px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03)',
                border: '1px solid #E2E8F0',
                maxWidth: '420px',
              },
              success: {
                iconTheme: {
                  primary: '#22C55E',
                  secondary: '#ffffff',
                },
                style: {
                  borderLeft: '4px solid #22C55E',
                },
              },
              error: {
                iconTheme: {
                  primary: '#d93b3b',
                  secondary: '#ffffff',
                },
                style: {
                  borderLeft: '4px solid #d93b3b',
                },
              },
            }} 
          />
          <AppRoutes />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
