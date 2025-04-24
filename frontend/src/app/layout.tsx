import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/blocks/sidebar/app-sidebar";
import { SiteHeader } from "@/components/blocks/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT Forum",
  description: "A forum for IT professionals to discuss and share knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased dark`}
      >
        <Providers>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <main>{children}</main>
          </SidebarInset>
        </Providers>
      </body>
    </html>
  );
}
