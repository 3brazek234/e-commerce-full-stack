"use client";
import { checkAuthStatus } from "@/app/actions/auth";
import { createContext, useContext, useEffect, useState } from "react";
type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
};
const AuthContext = createContext<AuthContextType | null>(null); type User = {
  
    name: string;
    email: string;

};
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedUserData = localStorage.getItem("user_data");
            if (storedUserData) {
                setUser(JSON.parse(storedUserData));
            }
            try {
                const status = await checkAuthStatus();

                if (!status.isAuthenticated) {
                    setUser(null);
                    localStorage.removeItem("user_data");
                }
            } catch (error) {
                console.error("Auth check failed", error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (userData: User) => {
        setUser(userData);

        localStorage.setItem("user_data", JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user_data");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};