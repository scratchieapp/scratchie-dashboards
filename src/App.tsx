import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import SiteDashboard from './components/SiteDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Home, Briefcase, HardHat } from 'lucide-react';

const DashboardSelector = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <img src="/scratchie-logo-black.svg" alt="Scratchie" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Scratchie Dashboard Demo</h1>
          <p className="text-gray-600">Select a dashboard to view</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin">
            <Card className="hover:shadow-lg transition-all cursor-pointer hover:border-blue-500">
              <CardContent className="p-6 text-center">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
                <p className="text-gray-600 text-sm mb-4">
                  System-wide administration and management
                </p>
                <Button className="w-full">View Admin Dashboard</Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/company">
            <Card className="hover:shadow-lg transition-all cursor-pointer hover:border-blue-500">
              <CardContent className="p-6 text-center">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h2 className="text-xl font-semibold mb-2">Company Dashboard</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Manage multiple sites and company-wide metrics
                </p>
                <Button className="w-full">View Company Dashboard</Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/site">
            <Card className="hover:shadow-lg transition-all cursor-pointer hover:border-blue-500">
              <CardContent className="p-6 text-center">
                <HardHat className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <h2 className="text-xl font-semibold mb-2">Site Dashboard</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Individual construction site management
                </p>
                <Button className="w-full">View Site Dashboard</Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-white border-b px-6 py-3">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard Selection
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardSelector />} />
        <Route path="/admin" element={
          <DashboardLayout>
            <AdminDashboard />
          </DashboardLayout>
        } />
        <Route path="/company" element={
          <DashboardLayout>
            <CompanyDashboard />
          </DashboardLayout>
        } />
        <Route path="/site" element={
          <DashboardLayout>
            <SiteDashboard />
          </DashboardLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;