import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  TrendingUp,
  Settings,
  HelpCircle
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/dashboard'
  },
  {
    id: 'products',
    label: 'Products',
    icon: <Package size={20} />,
    path: '/products'
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingCart size={20} />,
    path: '/orders'
  },
  {
    id: 'chats',
    label: 'Chats',
    icon: <MessageSquare size={20} />,
    path: '/chats'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <TrendingUp size={20} />,
    path: '/analytics'
  }
];

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '256px',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        zIndex: 40,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        color: 'white'
      }}
    >
      <div style={{
        padding: '1.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #6366f1, #4338ca)',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
          }}>
            <MessageSquare size={24} style={{ color: 'white' }} />
          </div>
          <div>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #a5b4fc, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              SalesSaarthi
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>AI Assistant</p>
          </div>
        </div>

        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ 
                scale: 1.02, 
                x: 4
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onItemClick(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                transition: 'all 0.2s ease',
                border: 'none',
                background: activeItem === item.id
                  ? 'linear-gradient(135deg, #4f46e5, #4338ca)'
                  : 'transparent',
                boxShadow: activeItem === item.id
                  ? '0 10px 15px -3px rgba(79, 70, 229, 0.25)'
                  : 'none',
                color: activeItem === item.id
                  ? 'white'
                  : '#cbd5e1',
                cursor: 'pointer'
              }}
            >
              <div style={{ color: activeItem === item.id ? 'white' : '#cbd5e1' }}>
                {item.icon}
              </div>
              <span style={{ 
                fontWeight: '500',
                color: activeItem === item.id ? 'white' : '#e2e8f0'
              }}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </nav>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '1.5rem',
        borderTop: '1px solid #334155'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.5rem' 
        }}>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              background: '#334155',
              color: 'white'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              color: '#cbd5e1',
              background: 'transparent',
              transition: 'all 0.2s ease',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Settings size={18} />
            <span>Settings</span>
          </motion.button>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              background: '#334155',
              color: 'white'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              color: '#cbd5e1',
              background: 'transparent',
              transition: 'all 0.2s ease',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <HelpCircle size={18} />
            <span>Help</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
