'use client'

import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickSeries } from 'lightweight-charts'
import { CandleData } from '@/util/trading.mock'
import './TradingChart.css'

interface TradingChartProps {
  candles: CandleData[]
  currentPrice: number
}

export function TradingChart({ candles, currentPrice }: TradingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const [isDark, setIsDark] = useState(false)

  // Track theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.body.classList.contains('dark'))
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const backgroundColor = isDark ? '#1a1a1a' : '#ffffff'
    const textColor = isDark ? '#ffffff' : '#333333'
    const gridColor = isDark ? '#374151' : '#f0f0f0'

    // Create chart
    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor: textColor,
      },
      width: containerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        horzLines: { color: gridColor },
        vertLines: { color: gridColor },
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
  }, [isDark])

  // Update chart with new candle data
  useEffect(() => {
    if (candleSeriesRef.current && candles.length > 0) {
      const lastCandle = candles[candles.length - 1]
      candleSeriesRef.current.update({
        time: lastCandle.time as any,
        open: lastCandle.open,
        high: lastCandle.high,
        low: lastCandle.low,
        close: lastCandle.close,
      })
    }
  }, [candles])

  return (
    <div className="trading-chart">
      <div ref={containerRef} className="trading-chart_graph" style={{ height: '400px' }} />
      <div className="trading-chart_info">
        <div>
          <p className="trading-chart_label">Current Price</p>
          <p className="trading-chart_price">${currentPrice.toFixed(2)}</p>
        </div>
        <div className="trading-chart_metrics">
          <div>
            <p className="trading-chart_label">High</p>
            <p className="trading-chart_metric-value">
              ${Math.max(...candles.map((c) => c.high)).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="trading-chart_label">Low</p>
            <p className="trading-chart_metric-value">
              ${Math.min(...candles.map((c) => c.low)).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
