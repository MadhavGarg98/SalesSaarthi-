import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Activity,
  Package
} from 'lucide-react';
import { getOrderStats, getOrders } from '../services/api';

interface OrderStats {
  totalOrders: number;
  paidOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  todayOrders: number;
  todayRevenue: number;
}

interface OrderData {
  id: string;
  phone: string;
  customerName: string;
  product: string;
  price: number;
  address: string;
  status: string;
  paymentStatus: string;
  createdAt: any;
}

const Dashboard: React.FC = () => {
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getGridColumns = () => {
    if (windowSize.width <= 768) return 1;
    if (windowSize.width <= 1024) return 2;
    return 4;
  };

  const getChartGridColumns = () => {
    if (windowSize.width <= 768) return 1;
    return 2;
  };

  const getPadding = () => {
    return windowSize.width <= 768 ? '16px' : '32px';
  };

  const getCardHeight = () => {
    return windowSize.width <= 768 ? '120px' : '140px';
  };

  const getChartHeight = () => {
    return windowSize.width <= 768 ? '280px' : '320px';
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatDate = (createdAt: any) => {
    if (!createdAt) return new Date().toLocaleDateString();
    
    if (typeof createdAt.toDate === 'function') {
      return createdAt.toDate().toLocaleDateString();
    }
    
    if (createdAt._seconds) {
      return new Date(createdAt._seconds * 1000).toLocaleDateString();
    }
    
    if (createdAt.seconds) {
      return new Date(createdAt.seconds * 1000).toLocaleDateString();
    }
    
    if (typeof createdAt === 'string') {
      return new Date(createdAt).toLocaleDateString();
    }
    
    if (typeof createdAt === 'number') {
      return new Date(createdAt).toLocaleDateString();
    }
    
    return new Date(createdAt).toLocaleDateString();
  };

  const fetchDashboardData = async () => {
    try {
      const [stats, orders] = await Promise.all([
        getOrderStats(),
        getOrders()
      ]);
      
      setOrderStats(stats);
      setRecentOrders(orders || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample chart data - replace with real data
  const chartData = [
    { name: 'Mon', orders: 12, revenue: 2400 },
    { name: 'Tue', orders: 19, revenue: 3800 },
    { name: 'Wed', orders: 15, revenue: 3000 },
    { name: 'Thu', orders: 25, revenue: 5000 },
    { name: 'Fri', orders: 22, revenue: 4400 },
    { name: 'Sat', orders: 30, revenue: 6000 },
    { name: 'Sun', orders: 28, revenue: 5600 },
  ];

  const StatCard = ({ 
    title, 
    value, 
    change, 
    changeType, 
    icon, 
    color 
  }: {
    title: string;
    value: string | number;
    change?: number;
    changeType?: 'increase' | 'decrease';
    icon: React.ReactNode;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -4, 
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        scale: 1.02
      }}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        height: getCardHeight(),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '8px',
            fontWeight: '500'
          }}>
            {title}
          </div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e293b',
            lineHeight: '1.2',
            marginBottom: '12px'
          }}>
            {value}
          </div>
          {change !== undefined && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: changeType === 'increase' ? '#10b981' : '#ef4444'
              }}>
                {changeType === 'increase' ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                )}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: changeType === 'increase' ? '#10b981' : '#ef4444'
              }}>
                {Math.abs(change)}%
              </span>
              <span style={{
                fontSize: '12px',
                color: '#94a3b8',
                marginLeft: '4px'
              }}>
                from yesterday
              </span>
            </div>
          )}
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: color,
          flexShrink: 0
        }}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid #e0e7ff',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '16px' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!orderStats) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Activity size={32} style={{ color: '#ef4444' }} />
          </div>
          <p style={{ fontSize: '20px', color: '#ef4444', fontWeight: '600' }}>Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: '0'
    }}>
      <div style={{
        padding: getPadding(),
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
          gap: '24px',
          marginBottom: '40px'
        }}>
          <StatCard
            title="Total Revenue"
            value={`¥${orderStats.totalRevenue.toLocaleString() || 0}`}
            change={12.5}
            changeType="increase"
            icon={<DollarSign size={24} style={{ color: '#ffffff' }} />}
            color="linear-gradient(135deg, #10b981, #059669)"
          />
          <StatCard
            title="Today's Orders"
            value={orderStats?.todayOrders || 0}
            change={8.2}
            changeType="increase"
            icon={<ShoppingCart size={24} style={{ color: '#ffffff' }} />}
            color="linear-gradient(135deg, #3b82f6, #2563eb)"
          />
          <StatCard
            title="Conversion Rate"
            value={`${orderStats?.totalOrders ? ((orderStats.paidOrders / orderStats.totalOrders) * 100).toFixed(1) : 0}%`}
            change={-2.4}
            changeType="decrease"
            icon={<TrendingUp size={24} style={{ color: '#ffffff' }} />}
            color="linear-gradient(135deg, #a855f7, #9333ea)"
          />
          <StatCard
            title="Active Chats"
            value="24"
            change={5.1}
            changeType="increase"
            icon={<MessageSquare size={24} style={{ color: '#ffffff' }} />}
            color="linear-gradient(135deg, #6366f1, #4f46e5)"
          />
        </div>

        {/* Charts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${getChartGridColumns()}, 1fr)`,
          gap: '24px',
          marginBottom: '40px'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              height: getChartHeight()
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '20px'
            }}>Revenue Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              height: getChartHeight()
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '20px'
            }}>Orders Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(226, 232, 240, 0.8)'
          }}
        >
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '20px'
          }}>Recent Orders</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {recentOrders.slice(0, 5).map((order, index) => (
              <motion.div
                key={order.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid rgba(226, 232, 240, 0.8)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#e0e7ff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Package size={20} style={{ color: '#6366f1' }} />
                  </div>
                  <div>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '2px'
                    }}>{order.customerName}</p>
                    <p style={{
                      fontSize: '13px',
                      color: '#64748b'
                    }}>{order.product}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '2px'
                  }}>${order.price}</p>
                  <p style={{
                    fontSize: '12px',
                    color: '#64748b'
                  }}>{formatDate(order.createdAt)}</p>
                </div>
              </motion.div>
            ))}
            {recentOrders.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px 0'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <ShoppingCart size={32} style={{ color: '#94a3b8' }} />
                </div>
                <p style={{
                  fontSize: '16px',
                  color: '#64748b',
                  marginBottom: '8px'
                }}>No orders yet</p>
                <p style={{
                  fontSize: '14px',
                  color: '#94a3b8'
                }}>Orders will appear here when customers make purchases</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

          </div>
  );
};

export default Dashboard;
