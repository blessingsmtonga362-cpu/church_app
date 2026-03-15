import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
  title: { template: "%s | Bimto Church", default: "Bimto Church — Love, Faith, Community" },
  description: "Bimto Church — rooted in Scripture, united in love. Join us Sundays in Lilongwe, Malawi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}