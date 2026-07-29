import "./globals.css";
import AuthSessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";
import { NotificationProvider } from "./components/NotificationContext";
import Notification from "./components/Notification";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <div className="mx-50 my-10">
              <Notification />
              {children}
            </div>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
