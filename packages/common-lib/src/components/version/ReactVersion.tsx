'use client'

import { useEffect, useState } from 'react'
import React from 'react'

export const ReactVersion = () => {
  const [reactVersion, setReactVersion] = useState('unknown')

  useEffect(() => {
    const version = React.version ?? 'unknown'
    setReactVersion(version)
  }, [])

  return (
    <div style={{ color: 'magenta', fontSize: '10px' }}>
      {reactVersion}
    </div>
  )
}