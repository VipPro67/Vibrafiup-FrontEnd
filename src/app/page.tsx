'use client'

import logo from '../../public/logo.png'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthAPI } from '@/apis/auth.page.api'
import { formatErrorResponse } from '@/util/general.helper'
import '@/app/page.css'
import Image from 'next/image'
import LoginForm from '@/app-reused/form/login/main'
// import LoginForm from '@/app-reused/form/login/main'
// import RegisterForm from '@/app-reused/form/register/main'

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
                {/* {formMode === formModes[1] && <RegisterForm />} } */}
                {formMode === formModes[2] && <></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
