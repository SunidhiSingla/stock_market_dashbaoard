import React, { useState } from 'react';
import { Search, TrendingUp, DollarSign, BarChart3, Activity, Loader2, TrendingDown } from 'lucide-react';

export default function StockMetricsDashboard() {
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [metrics, setMetrics] = useState(null);

  const calculateMetrics = (apiData) => {
    console.log('Full API Response:', apiData);
    
    const parseNum = (val) => {
      if (!val && val !== 0) return 0;
      if (typeof val === 'number') return val;
      const str = val.toString().replace(/,/g, '');
      return parseFloat(str) || 0;
    };

    const safeFind = (arr, key) => {
    if (!Array.isArray(arr)) return { value: 0 };
    const found = arr.find(item => item.key === key);
    return found || { value: 0 };
  };

    // Based on your Excel mapping, look for these specific fields:
    // peerCompanyList for many metrics
    const peerCompany = apiData.companyProfile.peerCompanyList[0] || {};

    // Extract values based on your Excel mapping
    const bal = apiData.financials[0].stockFinancialMap.BAL;
    const inc = apiData.financials[0].stockFinancialMap.INC;
    const cas = apiData.financials[0].stockFinancialMap.CAS;
    
    // Available fields (from peerCompanyList)
    const marketCap = parseNum(peerCompany.marketCap || 0);
    const roe = parseNum(peerCompany.returnOnAverageEquityTrailing12Month || 0);
    const netProfitMargin = parseNum(peerCompany.netProfitMarginPercentTrailing12Month || 0);
    const eps = parseNum(inc.find(item=>item.key === 'DilutedNormalizedEPS').value || 0);
    const peRatio = parseNum(peerCompany.priceToEarningsValueRatio || 0);
    const pbRatio = parseNum(peerCompany.priceToBookValueRatio || 0);
    const debtToEquity = parseNum(peerCompany.ltDebtPerEquityMostRecentFiscalYear || 0);
    
    // Current Price
    const currentPrice = parseNum(apiData.currentPrice?.NSE || apiData.currentPrice?.BSE || apiData.currentPrice || 0);
    
    // 52 Week High/Low
    const yearHigh = parseNum(apiData.yearHigh || peerCompany.yhigh || 0);
    const yearLow = parseNum(apiData.yearLow || peerCompany.ylow || 0);
     const totalAssets = parseNum(safeFind(bal, 'TotalAssets').value);
  const totalDebt = parseNum(safeFind(bal, 'TotalDebt').value);
  const cash = parseNum(safeFind(bal, 'Cash').value);
  const totalCurrentAssets = parseNum(safeFind(bal, 'TotalCurrentAssets').value);
  const totalCurrentLiabilities = parseNum(safeFind(bal, 'TotalCurrentLiabilities').value);
  const totalInventory = parseNum(safeFind(bal, 'TotalInventory').value);
  const totalReceivablesNet = parseNum(safeFind(bal, 'TotalReceivablesNet').value);
  const totalCommonShares = parseNum(safeFind(bal, 'TotalCommonSharesOutstanding').value);

  // Income Statement fields
  const totalRevenue = parseNum(safeFind(inc, 'TotalRevenue').value);
  const costOfRevenueTotal = parseNum(safeFind(inc, 'CostofRevenueTotal').value);
  const grossProfit = parseNum(safeFind(inc, 'GrossProfit').value);
  const operatingIncome = parseNum(safeFind(inc, 'OperatingIncome').value);
  const netIncome = parseNum(safeFind(inc, 'NetIncome').value);
  const totalOperatingExpense = parseNum(safeFind(inc, 'TotalOperatingExpense').value);
  const interestExpense = Math.abs(parseNum(safeFind(inc, 'InterestInc(Exp)Net-Non-OpTotal').value));

  // Cash Flow fields
  const cashFromOperatingActivities = parseNum(safeFind(cas, 'CashfromOperatingActivities').value);
  const capitalExpenditures = Math.abs(parseNum(safeFind(cas, 'CapitalExpenditures').value));

    // Calculate derived metrics using formulas from Excel
    
    // Enterprise Value = MarketCap + Total Debt - Cash
    const enterpriseValue = marketCap + totalDebt - cash;
    
    // Asset Turnover = Total Revenue / Total Assets
    const assetTurnover = totalAssets ? (totalRevenue / totalAssets) : 0;
    
    // Inventory Turnover = Cost of Revenue Total / Total Inventory
    const inventoryTurnover = totalInventory ? (costOfRevenueTotal / totalInventory) : 0;
    
    // Receivables Turnover = Total Revenue / Total Receivables Net
    const receivablesTurnover = totalReceivablesNet ? (totalRevenue / totalReceivablesNet) : 0;
    
    // Operating Efficiency = Operating Income / Total Operating Expense
    const operatingEfficiency = totalOperatingExpense ? (operatingIncome / totalOperatingExpense) : 0;
    
    // Working Capital Turnover = Total Revenue / (Total Current Assets - Total Current Liabilities)
    const workingCapital = totalCurrentAssets - totalCurrentLiabilities;
    const workingCapitalTurnover = workingCapital ? (totalRevenue / workingCapital) : 0;
    
    // ROA = Net Income / Total Assets
    const roa = totalAssets ? ((netIncome / totalAssets) * 100) : 0;
    
    // Gross Margin = Gross Profit / Total Revenue
    const grossMargin = totalRevenue ? ((grossProfit / totalRevenue) * 100) : 0;
    
    // Operating Margin = Operating Income / Total Revenue
    const operatingMargin = totalRevenue ? ((operatingIncome / totalRevenue) * 100) : 0;
    
    // ROCE = Operating Income / (Total Assets - Total Current Liabilities)
    const roce = (totalAssets - totalCurrentLiabilities) ? ((operatingIncome / (totalAssets - totalCurrentLiabilities)) * 100) : 0;
    
    // P/S Ratio = Current Price / (Total Revenue / Total Common Shares Outstanding)
    const revenuePerShare = totalCommonShares ? (totalRevenue / totalCommonShares) : 0;
    const psRatio = revenuePerShare ? (currentPrice / revenuePerShare) : 0;
    
    // Current Ratio = Total Current Assets / Total Current Liabilities
    const currentRatio = totalCurrentLiabilities ? (totalCurrentAssets / totalCurrentLiabilities) : 0;
    
    // Quick Ratio = (Total Current Assets - Inventory) / Total Current Liabilities
    const quickRatio = totalCurrentLiabilities ? ((totalCurrentAssets - totalInventory) / totalCurrentLiabilities) : 0;
    
    // Interest Coverage = Operating Income / Interest Expense
    const interestCoverage = interestExpense ? (operatingIncome / interestExpense) : 0;
    
    // FCF = Cash from Operating Activities - Capital Expenditures
    const fcf = cashFromOperatingActivities - capitalExpenditures;

    return {
      // Valuation Metrics
      marketCap: marketCap / 10000000, // Convert to Crores
      enterpriseValue: enterpriseValue / 10000000,
      currentPrice: currentPrice || 'N/A',
      yearHigh: yearHigh || 'N/A',
      yearLow: yearLow || 'N/A',
      
      // Efficiency Ratios
      assetTurnover: assetTurnover ? assetTurnover.toFixed(2) : 'N/A',
      inventoryTurnover: inventoryTurnover ? inventoryTurnover.toFixed(2) : 'N/A',
      receivablesTurnover: receivablesTurnover ? receivablesTurnover.toFixed(2) : 'N/A',
      operatingEfficiency: operatingEfficiency ? (operatingEfficiency * 100).toFixed(2) : 'N/A',
      workingCapitalTurnover: workingCapitalTurnover ? workingCapitalTurnover.toFixed(2) : 'N/A',
      
      // Profitability Ratios
      roa: roa ? roa.toFixed(2) : 'N/A',
      roe: roe ? roe.toFixed(2) : 'N/A',
      grossMargin: grossMargin ? grossMargin.toFixed(2) : 'N/A',
      operatingMargin: operatingMargin ? operatingMargin.toFixed(2) : 'N/A',
      netProfitMargin: netProfitMargin ? netProfitMargin.toFixed(2) : 'N/A',
      roce: roce ? roce.toFixed(2) : 'N/A',
      
      // Per Share Metrics
      eps: eps ? eps.toFixed(2) : 'N/A',
      peRatio: peRatio ? peRatio.toFixed(2) : 'N/A',
      pbRatio: pbRatio ? pbRatio.toFixed(2) : 'N/A',
      psRatio: psRatio ? psRatio.toFixed(2) : 'N/A',
      
      // Leverage Ratios
      debtToEquity: debtToEquity ? debtToEquity.toFixed(2) : 'N/A',
      currentRatio: currentRatio ? currentRatio.toFixed(2) : 'N/A',
      quickRatio: quickRatio ? quickRatio.toFixed(2) : 'N/A',
      interestCoverage: interestCoverage ? interestCoverage.toFixed(2) : 'N/A',
      
      // Cash Flow
      fcf: fcf ? fcf.toFixed(2) : 'N/A',
    };
  };

  const fetchStockData = async () => {
    if (!company.trim()) {
      setError('Please enter a company name');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);
    setMetrics(null);

    try {
      const response = await fetch(`https://stock.indianapi.in/stock?name=${encodeURIComponent(company)}`, {
        headers: {
          'X-Api-Key': 'sk-live-x4kuY7ESmHP05Y3JAgvKXnRgLkdzrXIlEkwLqr5T'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data. Please check the company name.');
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setData(result);
      
      if (result) {
        const calculatedMetrics = calculateMetrics(result);
        setMetrics(calculatedMetrics);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchStockData();
    }
  };

  const MetricCard = ({ icon: Icon, title, value, unit = '', color = '#3b82f6' }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '20px',
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Icon size={20} color={color} />
        <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: 0 }}>{title}</h3>
      </div>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
        {value && value !== 'N/A' ? `${unit}${value}` : 'N/A'}
      </p>
    </div>
  );

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    maxWidth: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '16px'
    },
    searchBox: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '32px'
    },
    searchContainer: {
      display: 'flex',
      gap: '16px',
      alignItems: 'stretch'
    },
    input: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.2s'
    },
    button: {
      padding: '12px 32px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    buttonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    },
    debugButton: {
      padding: '8px 16px',
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '14px',
      marginBottom: '16px'
    },
    error: {
      backgroundColor: '#fef2f2',
      borderLeft: '4px solid #ef4444',
      padding: '16px',
      borderRadius: '4px',
      marginBottom: '24px'
    },
    errorText: {
      color: '#b91c1c',
      margin: 0
    },
    section: {
      marginBottom: '32px'
    },
    sectionHeader: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '48px 0'
    },
    emptyText: {
      color: '#9ca3af',
      fontSize: '18px',
      marginTop: '16px'
    },
    companyInfo: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    companyName: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px'
    },
    companyDetails: {
      color: '#6b7280',
      fontSize: '16px'
    },
    debugBox: {
      backgroundColor: '#1f2937',
      color: '#f9fafb',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '24px',
      maxHeight: '400px',
      overflow: 'auto',
      fontSize: '12px',
      fontFamily: 'monospace'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <h1 style={styles.title}>Indian Stock Market Metrics</h1>
          <p style={styles.subtitle}>Comprehensive financial analysis dashboard</p>
        </div>

        <div style={styles.searchBox}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter company name (e.g., RELIANCE, TCS, INFY)"
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
            <button
              onClick={fetchStockData}
              disabled={loading}
              style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1d4ed8')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Search
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div style={styles.error}>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        {data && !error && (
          <>            
            <div style={styles.companyInfo}>
              <h2 style={styles.companyName}>{data.companyName || data.tickerId}</h2>
              <p style={styles.companyDetails}>
                {data.industry && `Industry: ${data.industry}`}
                {data.tickerId && ` | Ticker: ${data.tickerId}`}
              </p>
            </div>
          </>
        )}

        {metrics && (
          <div>
            <div style={styles.section}>
              <h2 style={styles.sectionHeader}>
                <DollarSign color="#10b981" />
                Valuation Metrics
              </h2>
              <div style={styles.grid}>
                <MetricCard icon={TrendingUp} title="Market Cap (Cr)" value={metrics.marketCap !== 0 ? metrics.marketCap.toFixed(2) : 'N/A'} unit="₹" color="#10b981" />
                <MetricCard icon={TrendingUp} title="Enterprise Value (Cr)" value={metrics.enterpriseValue !== 0 ? metrics.enterpriseValue.toFixed(2) : 'N/A'} unit="₹" color="#10b981" />
                <MetricCard icon={Activity} title="Current Price" value={metrics.currentPrice} unit="₹" color="#3b82f6" />
                <MetricCard icon={TrendingUp} title="52 Week High" value={metrics.yearHigh} unit="₹" color="#10b981" />
                <MetricCard icon={TrendingDown} title="52 Week Low" value={metrics.yearLow} unit="₹" color="#ef4444" />
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionHeader}>
                <BarChart3 color="#8b5cf6" />
                Efficiency Ratios
              </h2>
              <div style={styles.grid}>
                <MetricCard icon={Activity} title="Asset Turnover" value={metrics.assetTurnover} color="#8b5cf6" />
                <MetricCard icon={Activity} title="Inventory Turnover" value={metrics.inventoryTurnover} color="#8b5cf6" />
                <MetricCard icon={Activity} title="Receivables Turnover" value={metrics.receivablesTurnover} color="#8b5cf6" />
                <MetricCard icon={Activity} title="Operating Efficiency %" value={metrics.operatingEfficiency} color="#8b5cf6" />
                <MetricCard icon={Activity} title="Working Capital Turnover" value={metrics.workingCapitalTurnover} color="#8b5cf6" />
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionHeader}>
                <TrendingUp color="#3b82f6" />
                Profitability Ratios
              </h2>
              <div style={styles.grid}>
                <MetricCard icon={TrendingUp} title="ROA %" value={metrics.roa} color="#3b82f6" />
                <MetricCard icon={TrendingUp} title="ROE %" value={metrics.roe} color="#3b82f6" />
                <MetricCard icon={TrendingUp} title="Gross Margin %" value={metrics.grossMargin} color="#3b82f6" />
                <MetricCard icon={TrendingUp} title="Operating Margin %" value={metrics.operatingMargin} color="#3b82f6" />
                <MetricCard icon={TrendingUp} title="Net Profit Margin %" value={metrics.netProfitMargin} color="#3b82f6" />
                <MetricCard icon={TrendingUp} title="ROCE %" value={metrics.roce} color="#3b82f6" />
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionHeader}>
                <DollarSign color="#6366f1" />
                Per Share Metrics
              </h2>
              <div style={styles.grid}>
                <MetricCard icon={DollarSign} title="EPS" value={metrics.eps} unit="₹" color="#6366f1" />
                <MetricCard icon={Activity} title="P/E Ratio" value={metrics.peRatio} color="#6366f1" />
                <MetricCard icon={Activity} title="P/B Ratio" value={metrics.pbRatio} color="#6366f1" />
                <MetricCard icon={Activity} title="P/S Ratio" value={metrics.psRatio} color="#6366f1" />
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionHeader}>
                <BarChart3 color="#f97316" />
                Financial Health
              </h2>
              <div style={styles.grid}>
                <MetricCard icon={Activity} title="Debt to Equity" value={metrics.debtToEquity} color="#f97316" />
                <MetricCard icon={Activity} title="Current Ratio" value={metrics.currentRatio} color="#f97316" />
                <MetricCard icon={Activity} title="Quick Ratio" value={metrics.quickRatio} color="#f97316" />
                <MetricCard icon={Activity} title="Interest Coverage" value={metrics.interestCoverage} color="#f97316" />
                <MetricCard icon={DollarSign} title="Free Cash Flow" value={metrics.fcf} unit="₹" color="#f97316" />
              </div>
            </div>
          </div>
        )}

        {!metrics && !loading && !error && (
          <div style={styles.emptyState}>
            <Search size={64} color="#d1d5db" style={{ margin: '0 auto', display: 'block' }} />
            <p style={styles.emptyText}>Enter a company name to view financial metrics</p>
          </div>
        )}
      </div>
      
      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}