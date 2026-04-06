'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { handleOAuthCallback } from '@/apis/auth.page.api'
import { formatErrorResponse } from '@/util/general.helper'

export default function OAuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const errorParam = searchParams.get('error')

        if (errorParam) {
          setError(`Authentication failed: ${errorParam}`)
          setIsProcessing(false)
          return
        }

        if (!code || !state) {
          setError('Missing authorization code or state parameter')
          setIsProcessing(false)
          return
        }

        // Call the backend callback endpoint
        await handleOAuthCallback(code, state)

        // Success - redirect to dashboard/home
        router.push('/')
      } catch (err) {
        setError(formatErrorResponse(err) || 'Authentication failed. Please try again.')
        console.error(err)
        setIsProcessing(false)
      }
    }

    processCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md p-8">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner className="mb-4 h-8 w-8" />
            <p className="text-slate-600">Completing your sign in...</p>
          </div>
        ) : error ? (
          <div>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Authentication Error</h1>
            </div>
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="text-center">
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Back to Login
              </a>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  )
}
