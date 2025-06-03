import React from 'react';
import { Home, TrendingUp, Mail, Calendar, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
    { icon: Mail, label: 'Email', path: '/email' },
    { icon: Calendar, label: 'Project Plan', path: '/project-plan' },
    { icon: LogOut, label: 'Sign Out' },
  ];

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (item) => {
    if (item.label === 'Sign Out') {
      handleSignOut();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <img src="/favicon.png" alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <h2 className="font-bold text-gray-800">MANAGEMENT</h2>
            <h2 className="font-bold text-gray-800">PORTAL</h2>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  item.path && location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => handleNavigation(item)}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">👥</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">Copyright ©2025 GEM.</p>
          <p className="text-xs text-gray-500">All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
