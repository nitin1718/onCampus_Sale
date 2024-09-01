import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layouts/Navbar";
import GlobalProvider from "../GlobalProvider"

const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Campus Resale",
  description: "Created by nitin1718",
};

export default function RootLayout({ children,session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <GlobalProvider>
      <Nav/>
      {children}
      </GlobalProvider></body>

    </html>
  );
}