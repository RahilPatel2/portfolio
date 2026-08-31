import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";

export const metadata: Metadata = {
  title: "Rahil Pambhar | Full Stack Developer",
  description: "Portfolio of Rahil Pambhar, Full Stack & MERN Stack Developer. A cinematic web experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">
        <SmoothScrolling>
          <CustomCursor />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
