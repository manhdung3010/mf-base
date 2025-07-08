import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in real app, this would call your auth service
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin'
        };
        setUser(mockUser);
        return true;
      } else if (email === 'user@example.com' && password === 'password') {
        const mockUser: User = {
          id: '2',
          email: 'user@example.com',
          name: 'Regular User',
          role: 'user'
        };
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Mock registration - in real app, this would call your auth service
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user'
      };
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 