'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => void;
  createOrganization: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple hash function for demo (in production, use proper bcrypt on server)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('workflow_weaver_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('workflow_weaver_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Get stored users
    const storedUsers = localStorage.getItem('workflow_weaver_users');
    const users: Record<string, { passwordHash: string; name: string; organization?: string }> = 
      storedUsers ? JSON.parse(storedUsers) : {};

    const passwordHash = simpleHash(password);
    const userData = users[email];

    if (userData && userData.passwordHash === passwordHash) {
      const userObj: User = {
        id: simpleHash(email),
        email,
        name: userData.name,
        organization: userData.organization,
      };
      setUser(userObj);
      localStorage.setItem('workflow_weaver_user', JSON.stringify(userObj));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);

    // Get stored users
    const storedUsers = localStorage.getItem('workflow_weaver_users');
    const users: Record<string, { passwordHash: string; name: string; organization?: string }> = 
      storedUsers ? JSON.parse(storedUsers) : {};

    // Check if user already exists
    if (users[email]) {
      setIsLoading(false);
      return false;
    }

    // Create new user
    const passwordHash = simpleHash(password);
    users[email] = { passwordHash, name };
    localStorage.setItem('workflow_weaver_users', JSON.stringify(users));

    // Auto sign in
    const userObj: User = {
      id: simpleHash(email),
      email,
      name,
    };
    setUser(userObj);
    localStorage.setItem('workflow_weaver_user', JSON.stringify(userObj));
    setIsLoading(false);
    return true;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('workflow_weaver_user');
    router.push('/');
  };

  const createOrganization = (name: string) => {
    if (user) {
      const updatedUser = { ...user, organization: name };
      setUser(updatedUser);
      localStorage.setItem('workflow_weaver_user', JSON.stringify(updatedUser));
      
      // Update stored users
      const storedUsers = localStorage.getItem('workflow_weaver_users');
      const users: Record<string, { passwordHash: string; name: string; organization?: string }> = 
        storedUsers ? JSON.parse(storedUsers) : {};
      if (users[user.email]) {
        users[user.email].organization = name;
        localStorage.setItem('workflow_weaver_users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        signIn, 
        signUp, 
        signOut,
        createOrganization,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC for protected routes
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/sign-in');
      }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
};
