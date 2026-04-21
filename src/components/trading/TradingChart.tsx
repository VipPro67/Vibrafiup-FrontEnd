'use client'

import { useEffect, useRef } from 'react'
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickSeries } from 'lightweight-charts'
import { CandleData } from '@/util/trading.mock'

interface TradingChartProps {
  candles: CandleData[]
  currentPrice: number
}

export function TradingChart({ candles, currentPrice }: TradingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create chart
    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#333',
      },
      width: containerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        horzLines: { color: '#f0f0f0' },
        vertLines: { color: '#f0f0f0' },
      },
    })

    chartRef.current = chart

    // Add candlestick series
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderUpColor: '#26a69a',
      borderDownColor: '#ef5350',
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    })

    candleSeriesRef.current = candleSeries

    // Set data
    if (candles.length > 0) {
      candleSeries.setData(candles)
      chart.timeScale().fitContent()
    }

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartRef.current) {
        chartRef.current.remove()
      }
    }
  }, [])

  // Update chart with new candle data
  useEffect(() => {
    if (candleSeriesRef.current && candles.length > 0) {
      const lastCandle = candles[candles.length - 1]
      candleSeriesRef.current.update(lastCandle)
    }
  }, [candles])

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-full" style={{ height: '400px' }} />
      <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 p-4">
        <div>
          <p className="text-sm text-gray-600">Current Price</p>
          <p className="text-2xl font-bold text-gray-900">${currentPrice.toFixed(2)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">High</p>
            <p className="text-lg font-semibold text-gray-900">
              ${Math.max(...candles.map((c) => c.high)).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Low</p>
            <p className="text-lg font-semibold text-gray-900">
              ${Math.min(...candles.map((c) => c.low)).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
