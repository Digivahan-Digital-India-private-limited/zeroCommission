import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logoFull from '../assets/main logo.png';
import { 
  LayoutDashboard, 
  Users, 
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { adminLogoutAPI } from '../services/loanService';

export default function AdminLayout({ children, title = "Welcome Back, Admin", subtitle = "Here's what's happening with your platform today.", showBack = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await adminLogoutAPI();
    } catch (error) {
      console.error('Logout error:', error);
    }
    navigate('/page/admin');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col h-screen fixed left-0 top-0 z-20">
        
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center group">
            <img
              src={logoFull}
              alt="Zero Commission"
              className="h-11 w-auto object-contain hover:scale-105 transition-transform duration-300"
              style={{ filter: 'drop-shadow(0 1px 6px rgba(15,24,87,0.10))' }}
            />
          </Link>
        </div>

        <div className="p-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Menu</p>
          <nav className="space-y-2">
            <Link 
              to="/page/admin/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${isActive('/page/admin/dashboard') ? 'bg-[#f0f9ff] text-[#1a237e]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <LayoutDashboard size={20} className={isActive('/page/admin/dashboard') ? 'text-[#0197E0]' : ''} />
              Dashboard
            </Link>
            {/* Can add more generic menu links here if needed */}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors w-full"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-8 overflow-y-auto min-h-screen">
        <div className="max-w-6xl mx-auto">
          
          <header className="mb-10 flex justify-between items-end">
            <div className="flex items-center gap-4">
              {showBack && (
                <button 
                  onClick={() => navigate('/page/admin/dashboard')}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 bg-white shadow-sm border border-gray-100"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <div>
                <h1 className="text-3xl font-display font-bold text-[#1a237e] mb-2">{title}</h1>
                <p className="text-gray-500">{subtitle}</p>
              </div>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0197E0]"></div>
              <span className="text-sm font-medium text-gray-600">System Online</span>
            </div>
          </header>

          {children}

        </div>
      </div>
    </div>
  );
}
