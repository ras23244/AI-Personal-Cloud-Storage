import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Search, FileText, Upload, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: FileText, label: 'My Documents' },
    { to: '/upload', icon: Upload, label: 'Upload' },
    { to: '/search', icon: Search, label: 'Search' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-200"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-40 transform transition-transform">
            <div className="p-6 border-b border-gray-200 mt-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">DocSearch</h1>
                  <p className="text-xs text-gray-500">AI Semantic Search</p>
                </div>
              </div>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all w-full"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
