'use client';

import { SWRConfig } from "swr";
import { swrConfig } from "@/lib/swrConfig";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <SWRConfig value={swrConfig}> 
        {children}
      </SWRConfig>
  );
}
