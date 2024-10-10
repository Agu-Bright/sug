import localFont from "next/font/local";
import "./globals.css";
import GeneralContextProvider from "@/context/GeneralContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SUG Election",
  description: "SUG Election E-Ballot App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GeneralContextProvider>{children}</GeneralContextProvider>
      </body>
    </html>
  );
}
