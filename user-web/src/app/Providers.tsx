'use client';

import { SWRConfig } from "swr";
import { swrConfig } from "@/lib/swrConfig";
import {Toaster} from 'react-hot-toast'
import { AuthProvider } from "@/context/AuthContext";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <SWRConfig value={swrConfig}> 
      <AuthProvider>
      <Toaster/>
        {children}
        </AuthProvider>
      </SWRConfig>
  );
}
