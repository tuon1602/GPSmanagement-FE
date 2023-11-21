import { Inter } from "next/font/google";
import "./globals.css";
import { UiProvider } from "./Providers/UiProvider";
import AdminNavigation from "./components/admin/AdminNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UiProvider>
          <div className="flex gap-5 w-screen">
            <div className="p-5">
              <div className="h-full fixed">
                <AdminNavigation />
              </div>
            </div>
            <div className="flex-1 p-5 ml-32">{children}</div>
          </div>
        </UiProvider>
      </body>
    </html>
  );
}
