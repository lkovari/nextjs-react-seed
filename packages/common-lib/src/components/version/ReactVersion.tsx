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
    <div className="text-sm text-gray-700">
      <p>
        React version: <strong>{reactVersion}</strong>
      </p>
    </div>
  )
}