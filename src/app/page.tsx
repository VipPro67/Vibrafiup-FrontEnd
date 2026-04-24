'use client'

import logo from '../../public/logo.png'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/app/page.css'
import Image from 'next/image'
import LoginForm from '@/app-reused/form/login/main'
import ForgotPassForm from '@/app-reused/form/forgot-pass/main'
import RegisterForm from '@/app-reused/form/register/main'
import ThemeToggleButton from '@/app-reused/header/theme-toggle'

export default function ReferralPage() {
  const formModes = useMemo<string[]>(() => ["login", "register", "forgot-pass"], []);
  const router = useRouter()
  const [mounted, setMounted] = useState<boolean>(false)
  const [formMode, setFormMode] = useState<string>(formModes[0])

  useEffect(() => {
    setMounted(true)
  }, [])

  // useEffect(() => {
  //   if (!mounted) return

  //   const fetchAccountInfo = async () => {
  //     try {
  //       setLoading(true)
  //       setError('')
  //       const data = await authApi.getUserInfo()
  //       setAccount(data.body || data)
  //     } catch (err) {
  //       const errorMessage = formatErrorResponse(err) || 'Failed to load account info'
  //       setError(errorMessage)
  //       // If unauthorized, redirect to login
  //       if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
  //         router.push('/login')
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchAccountInfo()
  // }, [mounted, router])

  return (
    <div className="home">
      <div className="frame">
        <div className="header">
          <div className="logo">
            <span className="logo_main">
              <Image src={logo} alt="VB" priority />
            </span>
            <span className="logo_name">
              Vibrafi<span style={{ color: "var(--home-orange-1)" }}>up</span>
            </span>
          </div>
          <div className="menu">
            <a href="/trade" className="menu_item trade">TRADE</a>
            <a href="/explore" className="menu_item explore">EXPORE</a>
          </div>
          <div className="home-buttons">
            <ThemeToggleButton />
            <button className="get-apps">
              GET THE APP
            </button>
          </div>
        </div>

        <div className="container">
          <div className="referral-and-forms">
            <div className="referral">
              <span className="referral_title">Secure, Simple, Simpless</span>
              <span className="referral_content">
                <span className="content_highlighted">
                  Fast-track
                </span>
                <span className="content_normal">
                  to scrypto success
                </span>
              </span>
            </div>
            <div className="forms-container">
              <div className="forms-container_frame">
                <div className="forms-mode">
                  <span
                    className={`forms-mode_modes ${formMode === formModes[0] && "active"}`}
                    onClick={() => setFormMode(formModes[0])}>Sign In</span>
                  <span
                    className={`forms-mode_modes ${formMode === formModes[1] && "active"}`}
                    onClick={() => setFormMode(formModes[1])}>Sign Up</span>
                  <span
                    className={`forms-mode_modes ${formMode === formModes[2] && "active"}`}
                    onClick={() => setFormMode(formModes[2])}>Forgot Password</span>
                </div>

                {formMode === formModes[0] && <LoginForm /> }
                {formMode === formModes[1] && <RegisterForm />}
                {formMode === formModes[2] && <ForgotPassForm />}
              </div>
            </div>
            <FakeChart />
          </div>
        </div>
      </div>
    </div>
  )
}

function FakeChart() {
  return <div className="fake-chart-refferal">
    <div className="bar" style={{ height: '15%' }}></div>
    <div className="bar" style={{ height: '10%' }}></div>
    <div className="bar" style={{ height: '7%' }}></div>
    <div className="bar" style={{ height: '12%' }}></div>
    <div className="bar" style={{ height: '15%' }}></div>
    <div className="bar" style={{ height: '6%' }}></div>
    <div className="bar" style={{ height: '8%' }}></div>
    <div className="bar" style={{ height: '12%' }}></div>
    <div className="bar" style={{ height: '8%' }}></div>
    <div className="bar" style={{ height: '13%' }}></div>
    <div className="bar" style={{ height: '15%' }}></div>
    <div className="bar" style={{ height: '20%' }}></div>
    <div className="bar" style={{ height: '18%' }}></div>
    <div className="bar" style={{ height: '30%' }}></div>
    <div className="bar" style={{ height: '40%' }}></div>
    <div className="bar" style={{ height: '38%' }}></div>
    <div className="bar" style={{ height: '43%' }}></div>
    <div className="bar" style={{ height: '62%' }}></div>
    <div className="bar" style={{ height: '74%' }}></div>
    <div className="bar" style={{ height: '85%' }}></div>
    <div className="bar highlighted" style={{ height: '95%' }}></div>
    <div className="bar" style={{ height: '50%' }}></div>
    <div className="bar" style={{ height: '55%' }}></div>
    <div className="bar" style={{ height: '25%' }}></div>
    <div className="bar" style={{ height: '30%' }}></div>
    <div className="bar" style={{ height: '15%' }}></div>
  </div>
}