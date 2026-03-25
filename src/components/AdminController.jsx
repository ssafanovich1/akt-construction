'use client'
import { useState } from 'react'
import Footer from './Footer'
import AdminPanel from './AdminPanel'

export default function AdminController() {
  const [adminOpen, setAdminOpen] = useState(false)
  return (
    <>
      <Footer onAdminClick={() => setAdminOpen(true)} />
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  )
}
