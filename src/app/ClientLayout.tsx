"use client"

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/sidebar/main'

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hiddenSidebarScreens = [
    '/'
  ];
  const showSidebar = !hiddenSidebarScreens.includes(pathname);

  return (
    <div className={`app-layout ${showSidebar ? 'with-sidebar' : ''}`}>
      {showSidebar && <Sidebar />}
      <main className="app-layout_content">{children}</main>
    </div>
  )
}

export default ClientLayout