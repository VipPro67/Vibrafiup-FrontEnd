import { useEffect, useState } from "react";
import './TradingStats.css'


interface TradingInfoDto {
  totalTrades: string;
  winRate: string;
  wins: string;
  losses: string;
  totalProfit: string;
  totalLoss: string;
  netProfit: string;
}

interface TradingInfoResponse {
  annualInfo: TradingInfoDto;
  lastMonthInfo: TradingInfoDto;
}

export default function TradingStats() {
  const [annualStats, setAnnualStats] = useState<TradingInfoDto>({
    totalTrades: '0',
    winRate: '0.0%',
    wins: '0',
    losses: '0',
    totalProfit: '$0.00',
    totalLoss: '$0.00',
    netProfit: '$0.00'
  });
  const [lastMonthStats, setLastMonthStats] = useState<TradingInfoDto>({
    totalTrades: '0',
    winRate: '0.0%',
    wins: '0',
    losses: '0',
    totalProfit: '$0.00',
    totalLoss: '$0.00',
    netProfit: '$0.00'
  });

  useEffect(() => {
    async function fetchInfo() {
      const response = {
        data: {
          annualInfo: {
            totalTrades: '0',
            winRate: '0.0%',
            wins: '0',
            losses: '0',
            totalProfit: '$0.00',
            totalLoss: '$0.00',
            netProfit: '$0.00'
          },
          lastMonthInfo: {
            totalTrades: '0',
            winRate: '0.0%',
            wins: '0',
            losses: '0',
            totalProfit: '$0.00',
            totalLoss: '$0.00',
            netProfit: '$0.00'
          }
        }
      }
      setAnnualStats(response.data.annualInfo);
      setLastMonthStats(response.data.lastMonthInfo);
    }
    fetchInfo();
  }, []);

  return <div className="trading-stats">
    <StatsInfoBlock
      label="Total Trades"
      annualVal={annualStats.totalTrades}
      monthVal={lastMonthStats.totalTrades}
      blockName="totalTrades" />
    <StatsInfoBlock
      label="Win Rate"
      annualVal={annualStats.winRate}
      monthVal={lastMonthStats.winRate}
      blockName="winRate" />
    <StatsInfoBlock
      label="Wins"
      annualVal={annualStats.wins}
      monthVal={lastMonthStats.wins}
      blockName="wins" />
    <StatsInfoBlock
      label="Losses"
      annualVal={annualStats.losses}
      monthVal={lastMonthStats.losses}
      blockName="losses" />
    <StatsInfoBlock
      label="Total Profit"
      annualVal={annualStats.totalProfit}
      monthVal={lastMonthStats.totalProfit}
      blockName="totalProfit" />
    <StatsInfoBlock
      label="Total Loss"
      annualVal={annualStats.totalLoss}
      monthVal={lastMonthStats.totalLoss}
      blockName="totalLoss" />
    <StatsInfoBlock
      label="Total Loss"
      annualVal={annualStats.netProfit}
      monthVal={lastMonthStats.netProfit}
      blockName="netProfit" />
  </div>
} 

interface StatsInfoBlockProps {
  label: string;
  annualVal: string;
  monthVal: string;
  blockName: string;
}
function StatsInfoBlock(props: StatsInfoBlockProps) {
  return <div className={`stats-info ${props.blockName}`}>
    <span className="title">{props.label}</span>
    <div className="value">
      <span className="annual-value">{props.annualVal}</span>
      <span className="raw-value">{props.annualVal}</span>
    </div>
  </div>
}