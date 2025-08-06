'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-fuchsia-600 focus:outline-none mr-2"
      >
        ☰
      </button>
      {open && <Sidebar mobile />}
    </div>
  )
}