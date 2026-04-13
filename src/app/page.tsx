'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { authApi } from '@/apis/auth.page.api'
import { formatErrorResponse } from '@/util/general.helper'
import { Account } from '@/dtos/auth.page.dto'

export default function HomePage() {
  const router = useRouter()
  const [account, setAccount] = useState<Account | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchAccountInfo = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await authApi.getUserInfo()
        setAccount(data.body || data)
      } catch (err) {
        const errorMessage = formatErrorResponse(err) || 'Failed to load account info'
        setError(errorMessage)
        // If unauthorized, redirect to login
        if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
          router.push('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchAccountInfo()
  }, [mounted, router])

  const handleLogout = async () => {
    try {
      // Clear cookies by calling logout endpoint if available
      await authApi.logout()
      // For now, just redirect to login
      router.push('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <p className="text-foreground">Loading your account...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex-1"
            >
              Retry
            </Button>
            <Button
              onClick={() => router.push('/login')}
              className="flex-1"
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md p-6 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">No Account Found</h1>
          <p className="text-muted-foreground mb-6">
            Please log in to view your account information.
          </p>
          <Button onClick={() => router.push('/login')} className="w-full">
            Go to Login
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Information Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-foreground mt-1">{account.fullName || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground mt-1">{account.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Account ID</label>
                <p className="text-foreground mt-1 text-sm break-all">{account.id}</p>
              </div>
              {account.createdAt && mounted && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <p className="text-foreground mt-1">
                    {new Date(account.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full" disabled>
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Change Password
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Account Settings
              </Button>
              <Button
                variant="destructive"
                className="w-full mt-4"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
