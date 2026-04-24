'use client'

import logo from '../../../public/logo.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { House, BarChart3, TrendingUp, AlertCircle, Shield, Settings, LogOut } from 'lucide-react'
import ThemeToggleButton from '@/app-reused/header/theme-toggle'
import './main.css'
import Image from 'next/image'

const navItems = [
  { href: '/trade', label: 'Trading Contracts', icon: TrendingUp },
  { href: '/alerts', label: 'Pit Alerts', icon: AlertCircle },
  { href: '/risk-scanner', label: 'Risk Scanner', icon: Shield },
  { href: '/portfolio', label: 'Portfolio', icon: BarChart3 },
]

const bottomItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/logout', label: 'Logout', icon: LogOut },
]

export default function Sidebar() {
  const pathname = usePathname()

  const onToggleTheme = useCallback(() => {
    const nextIsDark = !document.body.classList.contains("dark");
    document.body.classList.toggle("dark", nextIsDark);
  }, []);

  return (
    <>
      <aside className="trade-sidebar">
        {/* Header */}
        <div className="trade-sidebar_header">
          <div className="logo">
            <span className="logo_main">
              <Image src={logo} alt="VB" priority />
            </span>
            <span className="logo_name">
              Vibrafi<span style={{ color: "var(--home-orange-1)" }}>up</span>
            </span>
          </div>
        </div>

      {/* Main Navigation */}
      <nav className="trade-sidebar_nav">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`trade-sidebar_link ${isActive ? 'active' : ''}`}
            >
              <Icon className="trade-sidebar_icon" />
              <span className="trade-sidebar_label">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="trade-sidebar_bottom">
        <div className="trade-sidebar_theme-toggle" onClick={onToggleTheme}>
          <ThemeToggleButton disableOnClick={true} />
          <span className="trade-sidebar_label">Theme</span>
        </div>
        {bottomItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`trade-sidebar_link ${isActive ? 'active' : ''}`}
            >
              <Icon className="trade-sidebar_icon" />
              <span className="trade-sidebar_label">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
    <div className="sidebar-overlay" />
    </>
  )
}
