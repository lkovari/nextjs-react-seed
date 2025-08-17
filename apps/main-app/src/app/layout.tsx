import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MobileMenuButton from "../components/MobileMenuButton";
import Sidebar from "../components/Sidebar";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const lastUpdateDate = "2025.08.17. 05:13 PM";
export const metadata: Metadata = {
  title: "NextJS Playground",
  description: "Demo project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased flex flex-col min-h-[100dvh] bg-white text-black dark:bg-black dark:text-white h-[calc(var(--vh)_*_100)]`}
      >
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white px-4 py-3 relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 sm:hidden">
        <MobileMenuButton />
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <p className="text-[0.5rem]">{lastUpdateDate}</p>
      </div>

      <div className="flex justify-center items-center gap-2">
        <a href="https://github.com/lkovari/nextjs-react-seed">
          <Image
            src="/github-mark-white.svg"
            width={32}
            height={32}
            alt="GitHub logo"
            className="hidden md:block object-contain"
          />
          <Image
            src="/github-mark-white.svg"
            width={16}
            height={16}
            alt="GitHub logo"
            className="block md:hidden object-contain"
          />
        </a>
        <h1 className="text-lg font-semibold text-center">
          <a href="https://nextjs.org">Next.js</a> Playground
        </h1>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-2 text-sm text-gray-800 dark:text-gray-300 mt-auto">
      © 2025 László Kővári — Built with <a href="https://nextjs.org">Next.js</a>
    </footer>
  );
}
