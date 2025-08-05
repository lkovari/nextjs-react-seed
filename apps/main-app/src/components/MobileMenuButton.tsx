'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-white focus:outline-none mr-2"
      >
        ☰
      </button>
      {open && <Sidebar mobile />}
    </div>
  )
}