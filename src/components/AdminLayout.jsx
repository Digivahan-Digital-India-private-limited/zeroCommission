import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import logoFull from '../assets/main logo.png';
import { 
  LayoutDashboard, 
  Users, 
  LogOut,
  ArrowLeft,
  BarChart2,
  Menu,
  X
} from 'lucide-react';
import { adminLogoutAPI } from '../services/loanService';

export default function AdminLayout({ children, title = "Welcome Back, Admin", subtitle = "Here's what's happening with your platform today.", showBack = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleLogout = async () => {
    try {
      await adminLogoutAPI();
    } catch (error) {
      console.error('Logout error:', error);
    }
    navigate('/page/admin');
  };

  const isActive = (path) => location.pathname === path;

  // Mobile menu open/close GSAP animations
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (menuOpen) {
      menu.style.display = 'block';
      gsap.fromTo(menu,
        { opacity: 0, y: -15, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
      );
      const items = menu.querySelectorAll('a, button.logout-btn');
      gsap.fromTo(items, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' });
    } else {
      gsap.to(menu, {
        opacity: 0, y: -10, scale: 0.96, duration: 0.2, ease: 'power2.in',
        onComplete: () => { if (menu) menu.style.display = 'none'; }
      });
    }
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex">
      {/* Desktop Sidebar */}
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
            <Link 
              to="/page/admin/check-cibil"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${isActive('/page/admin/check-cibil') ? 'bg-[#f0f9ff] text-[#1a237e]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <BarChart2 size={20} className={isActive('/page/admin/check-cibil') ? 'text-[#0197E0]' : ''} />
              Check Cibil
            </Link>
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
      <div className="flex-1 md:ml-64 p-4 sm:p-8 overflow-y-auto min-h-screen pt-20 md:pt-8">
        
        {/* Mobile Header Bar */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 z-30 flex items-center justify-between px-4">
          <Link to="/" className="flex items-center group">
            <img
              src={logoFull}
              alt="Zero Commission"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#1a237e] p-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div ref={mobileMenuRef}
          className="fixed top-[72px] left-4 right-4 z-40 rounded-2xl shadow-xl border border-gray-100 p-6 md:hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'none',
            opacity: 0
          }}>
          <div className="flex flex-col gap-2">
            <Link 
              to="/page/admin/dashboard" 
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-250 ${isActive('/page/admin/dashboard') ? 'bg-[#f0f9ff] text-[#1a237e]' : 'text-[#0f1857]/80 hover:bg-black/5 hover:text-[#0f1857]'}`}
            >
              <LayoutDashboard size={20} className={isActive('/page/admin/dashboard') ? 'text-[#0197E0]' : 'text-gray-400'} />
              Dashboard
            </Link>
            <Link 
              to="/page/admin/check-cibil" 
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-250 ${isActive('/page/admin/check-cibil') ? 'bg-[#f0f9ff] text-[#1a237e]' : 'text-[#0f1857]/80 hover:bg-black/5 hover:text-[#0f1857]'}`}
            >
              <BarChart2 size={20} className={isActive('/page/admin/check-cibil') ? 'text-[#0197E0]' : 'text-gray-400'} />
              Check Cibil
            </Link>
            
            <div className="border-t border-gray-100 my-2"></div>
            
            <button 
              onClick={() => { setMenuOpen(false); handleLogout(); }}
              className="logout-btn flex items-center gap-3 px-4 py-3 text-red-500 rounded-xl font-semibold transition-all hover:bg-red-50 text-left w-full"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          
          <header className="mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-2 md:mt-0">
            <div className="flex items-start sm:items-center gap-4">
              {showBack && (
                <button 
                  onClick={() => navigate('/page/admin/dashboard')}
                  className="p-2 mt-1 sm:mt-0 hover:bg-gray-200 rounded-full transition-colors text-gray-500 bg-white shadow-sm border border-gray-100 flex-shrink-0"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1a237e] mb-1.5 sm:mb-2 leading-tight">{title}</h1>
                <p className="text-gray-500 text-sm sm:text-base">{subtitle}</p>
              </div>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2 self-start sm:self-end">
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
