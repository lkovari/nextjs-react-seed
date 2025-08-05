// src/components/Sidebar.tsx
import Link from 'next/link'

export default function Sidebar({ mobile = false }: { mobile?: boolean }) {
  return (
    <aside
      className={`${
        mobile
          ? 'absolute left-0 top-12 z-50 w-60 p-4 shadow-md'
          : 'hidden sm:block w-60 p-4'
      } bg-gray-100 dark:bg-gray-900 text-black dark:text-white`}
    >
      <nav className="flex flex-col gap-2">
        <Link href="/about" className="hover:underline">About me</Link>
        <details>
          <summary className="cursor-pointer">Sandbox</summary>
          <nav className="ml-4 mt-1 flex flex-col gap-1">
            <Link href="/sandbox/data-input" className="hover:underline">Data Input</Link>
            <Link href="/sandbox/cross-field" className="hover:underline">Cross Field</Link>
            <Link href="/sandbox/controls" className="hover:underline">Controls</Link>
            <Link href="/sandbox/other" className="hover:underline">Other</Link>
          </nav>
        </details>
        <a
          href="https://lkovari.github.io/LKovariHome/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          LKovariHome
        </a>
      </nav>
    </aside>
  )
}