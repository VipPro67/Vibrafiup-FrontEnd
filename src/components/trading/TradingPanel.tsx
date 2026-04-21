'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUp, ArrowDown } from 'lucide-react'
import './TradingPanel.css'

interface TradingPanelProps {
  currentPrice: number
  onTradeUp: () => void
  onTradeDown: () => void
  isTrading?: boolean
}

export function TradingPanel({
  currentPrice,
  onTradeUp,
  onTradeDown,
  isTrading = false,
}: TradingPanelProps) {
  return (
    <Card className="tradingpanel">
      <div className="tradingpanel_header">
        <h2 className="tradingpanel_header-title">Quick Trade</h2>
        <p className="tradingpanel_header-price">Current Price: ${currentPrice.toFixed(2)}</p>
      </div>

      <div className="tradingpanel_actions">
        <Button
          onClick={onTradeUp}
          disabled={isTrading}
          className="tradingpanel_actions-button tradingpanel_actions-button-up"
        >
          <ArrowUp className="tradingpanel_actions-button-icon" />
          PREDICT UP
        </Button>

        <Button
          onClick={onTradeDown}
          disabled={isTrading}
          className="tradingpanel_actions-button tradingpanel_actions-button-down"
        >
          <ArrowDown className="tradingpanel_actions-button-icon" />
          PREDICT DOWN
        </Button>
      </div>

      <div className="tradingpanel_info">
        <p className="tradingpanel_info-text">
          <span className="tradingpanel_info-label">How it works:</span> Predict if the price will go UP or DOWN
          in the next candle (5 minutes). Win if your prediction is correct!
        </p>
      </div>
    </Card>
  )
}
