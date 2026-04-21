'use client'

import { useState, useEffect, useCallback } from 'react'
import Sidebar from '@/components/trading/Sidebar'
import { TradingChart } from '@/components/trading/TradingChart'
import { TradingPanel } from '@/components/trading/TradingPanel'
import { TradingHistory } from '@/components/trading/TradingHistory'
import TradingStats from '@/components/trading/TradingStats'
import {
  generateInitialCandles,
  generateNewCandle,
  updateCurrentCandle,
  createTrade,
  settleTrade,
  calculateStats,
  CandleData,
  Trade,
  TradingStats as TradingStatsType,
} from '@/util/trading.mock'

const CANDLE_UPDATE_INTERVAL = 3000 // 3 seconds for demo
const TRADE_SETTLEMENT_TIME = 10000 // 10 seconds for demo

export default function TradingPage() {
  const [candles, setCandles] = useState<CandleData[]>([])
  const [currentPrice, setCurrentPrice] = useState(100)
  const [trades, setTrades] = useState<Trade[]>([])
  const [isTrading, setIsTrading] = useState(false)
  const [pendingSettlement, setPendingSettlement] = useState<Map<string, NodeJS.Timeout>>(new Map())

  // Initialize candles
  useEffect(() => {
    const initialCandles = generateInitialCandles(50)
    setCandles(initialCandles)
    if (initialCandles.length > 0) {
      setCurrentPrice(initialCandles[initialCandles.length - 1].close)
    }
  }, [])

  // Update price every interval
  useEffect(() => {
    if (candles.length === 0) return

    const interval = setInterval(() => {
      setCandles((prev) => {
        if (prev.length === 0) return prev

        const lastCandle = prev[prev.length - 1]
        const now = Math.floor(Date.now() / 1000)

        // Generate new candle if 5 minutes have passed
        if (now - lastCandle.time >= 300) {
          const newCandle = generateNewCandle(lastCandle)
          setCurrentPrice(newCandle.close)
          return [...prev, newCandle]
        } else {
          // Update current candle with new price
          const updatedCandle = updateCurrentCandle(lastCandle)
          setCurrentPrice(updatedCandle.close)
          return [...prev.slice(0, -1), updatedCandle]
        }
      })
    }, CANDLE_UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [candles.length])

  // Handle trade execution
  const handleTrade = useCallback(
    (direction: 'UP' | 'DOWN') => {
      if (isTrading) return

      setIsTrading(true)
      const newTrade = createTrade(direction, currentPrice)
      setTrades((prev) => [newTrade, ...prev])

      // Schedule settlement
      const timeoutId = setTimeout(() => {
        setTrades((prev) =>
          prev.map((trade) => {
            if (trade.id === newTrade.id) {
              return settleTrade(trade, currentPrice)
            }
            return trade
          })
        )

        setPendingSettlement((prev) => {
          const newMap = new Map(prev)
          newMap.delete(newTrade.id)
          return newMap
        })

        setIsTrading(false)
      }, TRADE_SETTLEMENT_TIME)

      setPendingSettlement((prev) => new Map(prev).set(newTrade.id, timeoutId))
    },
    [currentPrice, isTrading]
  )

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      pendingSettlement.forEach((timeoutId) => clearTimeout(timeoutId))
    }
  }, [pendingSettlement])

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Trading Contracts</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Chart and Panel */}
            <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <TradingChart candles={candles} currentPrice={currentPrice} />
            </div>

            {/* Trading Panel */}
            <TradingPanel
              currentPrice={currentPrice}
              onTradeUp={() => handleTrade('UP')}
              onTradeDown={() => handleTrade('DOWN')}
              isTrading={isTrading}
            />
          </div>

          {/* Right Column - Stats and History */}
          <div className="space-y-6">
            {/* Statistics */}
            <TradingStats />

              {/* Trading History */}
              <TradingHistory trades={trades} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
