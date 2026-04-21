'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trade } from '@/util/trading.mock'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

interface TradingHistoryProps {
  trades: Trade[]
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

function TradeRow({ trade }: { trade: Trade }) {
  const isWin = trade.status === 'WIN'
  const isLoss = trade.status === 'LOSS'
  const isOpen = trade.status === 'OPEN'

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3 last:border-b-0">
      <div className="flex flex-1 items-center gap-3">
        {isWin && <CheckCircle className="h-5 w-5 text-green-500" />}
        {isLoss && <XCircle className="h-5 w-5 text-red-500" />}
        {isOpen && <Clock className="h-5 w-5 text-blue-500" />}

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{trade.direction}</span>
            <Badge variant={trade.direction === 'UP' ? 'default' : 'destructive'}>
              Entry: ${trade.entryPrice.toFixed(2)}
            </Badge>
          </div>
          <p className="text-xs text-gray-500">{formatTime(trade.entryTime)}</p>
        </div>
      </div>

      <div className="text-right">
        {isOpen ? (
          <p className="text-sm font-semibold text-blue-600">Pending</p>
        ) : (
          <>
            <p
              className={`text-sm font-semibold ${isWin ? 'text-green-600' : 'text-red-600'}`}
            >
              {isWin ? '+' : ''}${trade.profitLoss?.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-gray-500">{trade.profitLossPercent?.toFixed(2)}%</p>
          </>
        )}
      </div>
    </div>
  )
}

export function TradingHistory({ trades }: TradingHistoryProps) {
  const recentTrades = [...trades].reverse().slice(0, 10)

  return (
    <Card className="w-full p-6">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Recent Trades</h2>

      {recentTrades.length === 0 ? (
        <div className="flex h-32 items-center justify-center">
          <p className="text-center text-gray-500">No trades yet. Start trading to see history!</p>
        </div>
      ) : (
        <div className="space-y-0">{recentTrades.map((trade) => <TradeRow key={trade.id} trade={trade} />)}</div>
      )}
    </Card>
  )
}
