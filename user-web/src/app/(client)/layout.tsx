
import Header from "@/components/Header";
import "../globals.css";
import Footer from "@/components/Footer";
import Providers from "../Providers";
import { ClerkProvider } from "@clerk/nextjs";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
            <Providers>
                  <ClerkProvider>

        <div className="flex flex-col justify-between min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        </ClerkProvider>
        </Providers>

  );
}
