import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer"

export const metadata: Metadata = {
  title: {
    template: "%s | Bimto Church",
    default: "Bimto Church — Love, Faith, Community",
  },
  description:
    "Bimto Church — A community rooted in Scripture, united in love, and sent to serve the world. Join us every Sunday in Lilongwe, Malawi.",
  keywords: ["church", "Malawi", "Lilongwe", "Bimto", "Christian", "worship", "sermons"],
  openGraph: {
    siteName: "Bimto Church",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Sticky top nav — reused on every page */}
        <Navbar />

        {/* Page-specific content renders here */}
        <main>{children}</main>

        {/* Site-wide footer — reused on every page */}
        <Footer />
      </body>
    </html>
  );
}