// Mock data generator for trading platform

export interface CandleData {
  time: number
  open: number
  high: number
  low: number
  close: number
}

export interface Trade {
  id: string
  direction: 'UP' | 'DOWN'
  entryPrice: number
  entryTime: number
  exitPrice?: number
  exitTime?: number
  status: 'OPEN' | 'WIN' | 'LOSS'
  profitLoss?: number
  profitLossPercent?: number
}

// Generate initial candlestick data
export function generateInitialCandles(count: number = 100): CandleData[] {
  const candles: CandleData[] = []
  let basePrice = 100
  const now = Math.floor(Date.now() / 1000)

  for (let i = count; i > 0; i--) {
    const time = now - i * 300 // 5-minute candles
    const change = (Math.random() - 0.5) * 5
    const open = basePrice
    const close = basePrice + change
    const high = Math.max(open, close) + Math.random() * 2
    const low = Math.min(open, close) - Math.random() * 2

    candles.push({
      time,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    })

    basePrice = close
  }

  return candles
}

// Generate new candle data (simulated price update)
export function generateNewCandle(lastCandle: CandleData): CandleData {
  const time = lastCandle.time + 300 // Next 5-minute candle
  const change = (Math.random() - 0.5) * 5
  const open = lastCandle.close
  const close = open + change
  const high = Math.max(open, close) + Math.random() * 2
  const low = Math.min(open, close) - Math.random() * 2

  return {
    time,
    open: parseFloat(open.toFixed(2)),
    high: parseFloat(high.toFixed(2)),
    low: parseFloat(low.toFixed(2)),
    close: parseFloat(close.toFixed(2)),
  }
}

// Generate new tick data (update within current candle)
export function updateCurrentCandle(
  candle: CandleData,
  direction: 'up' | 'down' = Math.random() > 0.5 ? 'up' : 'down'
): CandleData {
  const tickChange = (Math.random() - 0.5) * 1
  const newPrice = candle.close + (direction === 'up' ? Math.abs(tickChange) : -Math.abs(tickChange))

  return {
    ...candle,
    close: parseFloat(newPrice.toFixed(2)),
    high: Math.max(candle.high, newPrice),
    low: Math.min(candle.low, newPrice),
  }
}

// Create a new trade
export function createTrade(direction: 'UP' | 'DOWN', entryPrice: number): Trade {
  return {
    id: `trade-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    direction,
    entryPrice,
    entryTime: Date.now(),
    status: 'OPEN',
  }
}

// Settle a trade (simulate price movement)
export function settleTrade(trade: Trade, currentPrice: number): Trade {
  if (trade.status !== 'OPEN') return trade

  const isWin =
    (trade.direction === 'UP' && currentPrice > trade.entryPrice) ||
    (trade.direction === 'DOWN' && currentPrice < trade.entryPrice)

  const profitLoss = currentPrice - trade.entryPrice
  const profitLossPercent = (profitLoss / trade.entryPrice) * 100

  return {
    ...trade,
    exitPrice: currentPrice,
    exitTime: Date.now(),
    status: isWin ? 'WIN' : 'LOSS',
    profitLoss: parseFloat(profitLoss.toFixed(2)),
    profitLossPercent: parseFloat(profitLossPercent.toFixed(2)),
  }
}

// Calculate trading statistics
export interface TradingStats {
  totalTrades: number
  winTrades: number
  lossTrades: number
  winRate: number
  totalProfit: number
  totalLoss: number
  netProfit: number
}

export function calculateStats(trades: Trade[]): TradingStats {
  const settledTrades = trades.filter((t) => t.status !== 'OPEN')
  const wins = settledTrades.filter((t) => t.status === 'WIN')
  const losses = settledTrades.filter((t) => t.status === 'LOSS')

  const totalProfit = wins.reduce((sum, t) => sum + (t.profitLoss || 0), 0)
  const totalLoss = losses.reduce((sum, t) => sum + (t.profitLoss || 0), 0)

  return {
    totalTrades: settledTrades.length,
    winTrades: wins.length,
    lossTrades: losses.length,
    winRate: settledTrades.length > 0 ? (wins.length / settledTrades.length) * 100 : 0,
    totalProfit: parseFloat(totalProfit.toFixed(2)),
    totalLoss: parseFloat(totalLoss.toFixed(2)),
    netProfit: parseFloat((totalProfit + totalLoss).toFixed(2)),
  }
}
