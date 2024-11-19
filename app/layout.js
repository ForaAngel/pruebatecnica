import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={geistSans.className}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              icon: "✅",
              style: {
                background: "#059669",
              },
            },
            error: {
              icon: "❌",
              style: {
                background: "#DC2626",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
