import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './app/providers/theme';
import { LoginPage } from './pages/login/LoginPage';
import { DashboardLayout } from './widgets/layout/DashboardLayout';
import { ManagerDashboard } from './pages/dashboard/ManagerDashboard';
import { MusterPage } from './pages/muster/MusterPage';
import { DigitalMusterPage } from './pages/muster/DigitalMusterPage';
import { HarvestPage } from './pages/harvest/HarvestPage';
import { StockApprovalPage } from './pages/stock/StockApprovalPage';
import { FieldOfficerLayout } from './widgets/layout/FieldOfficerLayout';
import { MorningMusterPage } from './pages/field-dashboard/MorningMusterPage';
import { WorkProgramPage } from './pages/field-dashboard/WorkProgramPage';
import { InventoryPage } from './pages/inventory/InventoryPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Manager Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="muster" element={<MusterPage />} />
            <Route path="digital-muster" element={<DigitalMusterPage />} />
            <Route path="harvest" element={<HarvestPage />} />
            <Route path="orders" element={<StockApprovalPage />} />
            <Route path="inventory" element={<InventoryPage />} />
          </Route>

          {/* Field Officer Dashboard Routes */}
          <Route path="/field-dashboard" element={<FieldOfficerLayout />}>
            <Route index element={<Navigate to="program" replace />} />
            <Route path="program" element={<WorkProgramPage />} />
            <Route path="muster-morning" element={<MorningMusterPage />} />
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
