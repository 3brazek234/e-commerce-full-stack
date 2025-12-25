'use server';
import { cookies } from "next/headers";
import { da } from "zod/v4/locales";

type LoginProps = {
    email: string;   
    password: string;
}

type RegisterProps = {
    name: string;
    email: string;   
    password: string;
}
 async function loginForm(userData: LoginProps) {
   
    try {
        const res = await fetch('http://localhost:8000/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        if (!res.ok) {
            console.log("Backend Error Response:", data); 
                        return { 
                success: false, 
                message: data.message || "failed to login, check your credentials" 
            };
        }
        const cookieStore = await cookies();
        cookieStore.set('session_token', data.token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7 
        });

  
        return { success: true, user: data.user, message: data.message};

    } catch (error) {
        console.error("Network Error:", error);
        return { success: false, message: "حدث خطأ في الاتصال بالخادم" };
    }
}
async function register(userData: RegisterProps) {
    const res = await fetch('http://localhost:8000/api/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    });
    if (!res.ok) {
        throw new Error("Failed to register");
    }
    return res.json();
}
 async function checkAuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token');
  if (!token) {
    return { isAuthenticated: false, user: null };
  }
  return { isAuthenticated: true };
}
 async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
  return { success: true };
}
export { loginForm, register, checkAuthStatus, logoutAction };