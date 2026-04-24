'use client'

import { Trade } from '@/util/trading.mock'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import './TradingHistory.css'

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
    <div className="trade-history_row">
      <div className="trade-history_row-left">
        {isWin && <CheckCircle className="trade-history_icon win" />}
        {isLoss && <XCircle className="trade-history_icon loss" />}
        {isOpen && <Clock className="trade-history_icon open" />}

        <div className="trade-history_trade-info">
          <div className="trade-history_trade-head">
            <span className="trade-history_direction">{trade.direction}</span>
            <span className={`trade-history_badge ${trade.direction === 'UP' ? 'up' : 'down'}`}>
              Entry: ${trade.entryPrice.toFixed(2)}
            </span>
          </div>
          <p className="trade-history_time">{formatTime(trade.entryTime)}</p>
        </div>
      </div>

      <div className="trade-history_result">
        {isOpen ? (
          <p className="trade-history_pending">Pending</p>
        ) : (
          <>
            <p className={`trade-history_profit ${isWin ? 'win' : 'loss'}`}>
              {isWin ? '+' : ''}${trade.profitLoss?.toFixed(2) || '0.00'}
            </p>
            <p className="trade-history_percent">{trade.profitLossPercent?.toFixed(2)}%</p>
          </>
        )}
      </div>
    </div>
  )
}

export function TradingHistory({ trades }: TradingHistoryProps) {
  const recentTrades = [...trades].reverse().slice(0, 10)

  return (
    <div className="trade-history">
      <h2 className="trade-history_title">Recent Trades</h2>

      {recentTrades.length === 0 ? (
        <div className="trade-history_empty">
          <p className="trade-history_empty-text">No trades yet. Start trading to see history!</p>
        </div>
      ) : (
        <div>{recentTrades.map((trade) => <TradeRow key={trade.id} trade={trade} />)}</div>
      )}
    </div>
  )
}
