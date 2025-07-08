import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useCart } from './store';

// Lazy load remote components with error boundaries
const RemoteComponent = ({ fallback, errorFallback }: { fallback: React.ReactNode, errorFallback: React.ReactNode }) => {
  const [error, setError] = React.useState(false);
  
  if (error) {
    return <>{errorFallback}</>;
  }
  
  return (
    <Suspense fallback={fallback}>
      <div className="p-8 text-center">
        <p>Remote component loading...</p>
        <p className="text-sm text-gray-500 mt-2">If this persists, the remote app may not be running</p>
      </div>
    </Suspense>
  );
};

const Navigation: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, cartTotal } = useCart();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              MF Shell
            </Link>
            <div className="ml-10 flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Products
              </Link>
              <Link to="/cart" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Cart ({cart.length}) - ${cartTotal.toFixed(2)}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage: React.FC = () => (
  <div className="p-8 text-center">
    <h1 className="text-3xl font-bold text-blue-600">Micro-Frontend Shell</h1>
    <p className="mt-2 text-gray-600">Welcome to the Micro-Frontend Architecture!</p>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Products</h3>
        <p className="text-gray-600">Browse and manage products</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Cart</h3>
        <p className="text-gray-600">Manage your shopping cart</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Dashboard</h3>
        <p className="text-gray-600">View analytics and reports</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="max-w-7xl mx-auto py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/products" 
                element={
                  <RemoteComponent 
                    fallback={<div className="p-8 text-center">Loading Products...</div>}
                    errorFallback={<div className="p-8 text-center">Products App (Remote) - Not Available</div>}
                  />
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <RemoteComponent 
                    fallback={<div className="p-8 text-center">Loading Cart...</div>}
                    errorFallback={<div className="p-8 text-center">Cart App (Remote) - Not Available</div>}
                  />
                } 
              />
              <Route 
                path="/auth" 
                element={
                  <RemoteComponent 
                    fallback={<div className="p-8 text-center">Loading Auth...</div>}
                    errorFallback={<div className="p-8 text-center">Auth App (Remote) - Not Available</div>}
                  />
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <RemoteComponent 
                    fallback={<div className="p-8 text-center">Loading Dashboard...</div>}
                    errorFallback={<div className="p-8 text-center">Dashboard App (Remote) - Not Available</div>}
                  />
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <RemoteComponent 
                    fallback={<div className="p-8 text-center">Loading Admin...</div>}
                    errorFallback={<div className="p-8 text-center">Admin App (Remote) - Not Available</div>}
                  />
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 