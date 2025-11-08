import React, { useState } from 'react';
import { Trash2, Plus, Loader2, TrendingUp, AlertCircle, Settings, X } from 'lucide-react';
import styles from './styles';
import FAQs from './FAQs';

export default function StockMetricsComparison() {
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [customWeights, setCustomWeights] = useState({});
  const [useCustomWeights, setUseCustomWeights] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);

  const defaultMetrics = [
    { category: 'Valuation', items: [
      { label: 'Market Cap (Cr)', key: 'marketCap', unit: '₹', scoreLogic: 'higher' },
      { label: 'Enterprise Value (Cr)', key: 'enterpriseValue', unit: '₹', scoreLogic: 'higher' },
      { label: 'Current Price', key: 'currentPrice', unit: '₹', scoreLogic: 'neutral' },
      { label: '52 Week High', key: 'yearHigh', unit: '₹', scoreLogic: 'neutral' },
      { label: '52 Week Low', key: 'yearLow', unit: '₹', scoreLogic: 'neutral' },
    ]},
    { category: 'Efficiency', items: [
      { label: 'Asset Turnover', key: 'assetTurnover', scoreLogic: 'higher' },
      { label: 'Inventory Turnover', key: 'inventoryTurnover', scoreLogic: 'higher' },
      { label: 'Receivables Turnover', key: 'receivablesTurnover', scoreLogic: 'higher' },
      { label: 'Operating Efficiency %', key: 'operatingEfficiency', scoreLogic: 'higher' },
      { label: 'Working Capital Turnover', key: 'workingCapitalTurnover', scoreLogic: 'higher' },
    ]},
    { category: 'Profitability', items: [
      { label: 'ROA %', key: 'roa', scoreLogic: 'higher' },
      { label: 'ROE %', key: 'roe', scoreLogic: 'higher' },
      { label: 'Gross Margin %', key: 'grossMargin', scoreLogic: 'higher' },
      { label: 'Operating Margin %', key: 'operatingMargin', scoreLogic: 'higher' },
      { label: 'Net Profit Margin %', key: 'netProfitMargin', scoreLogic: 'higher' },
      { label: 'ROCE %', key: 'roce', scoreLogic: 'higher' },
    ]},
    { category: 'Per Share', items: [
      { label: 'EPS', key: 'eps', unit: '₹', scoreLogic: 'higher' },
      { label: 'P/E Ratio', key: 'peRatio', scoreLogic: 'lower' },
      { label: 'P/B Ratio', key: 'pbRatio', scoreLogic: 'lower' },
      { label: 'P/S Ratio', key: 'psRatio', scoreLogic: 'lower' },
    ]},
    { category: 'Financial Health', items: [
      { label: 'Debt to Equity', key: 'debtToEquity', scoreLogic: 'lower' },
      { label: 'Current Ratio', key: 'currentRatio', scoreLogic: 'higher' },
      { label: 'Quick Ratio', key: 'quickRatio', scoreLogic: 'higher' },
      { label: 'Interest Coverage', key: 'interestCoverage', scoreLogic: 'higher' },
      { label: 'Free Cash Flow (Cr)', key: 'fcf', unit: '₹', scoreLogic: 'higher' },
    ]},
  ];

  const calculateMetrics = (apiData) => {
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

    // Extract values based on your Excel mapping with safe access
    const bal = apiData?.financials?.[0]?.stockFinancialMap?.BAL || [];
    const inc = apiData?.financials?.[0]?.stockFinancialMap?.INC || [];
    const cas = apiData?.financials?.[0]?.stockFinancialMap?.CAS || [];
    const peerCompany = apiData?.companyProfile?.peerCompanyList?.[0] || {};
    
    // Available fields (from peerCompanyList)
    // Available fields (from peerCompanyList)
    const marketCap = parseNum(peerCompany.marketCap || 0);
    const roe = parseNum(peerCompany.returnOnAverageEquityTrailing12Month || 0);
    const netProfitMargin = parseNum(peerCompany.netProfitMarginPercentTrailing12Month || 0);
    const peRatio = parseNum(peerCompany.priceToEarningsValueRatio || 0);
    const pbRatio = parseNum(peerCompany.priceToBookValueRatio || 0);
    const debtToEquity = parseNum(peerCompany.ltDebtPerEquityMostRecentFiscalYear || 0);

    // Balance Sheet fields
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
    const eps = parseNum(safeFind(inc, 'DilutedNormalizedEPS').value);

    // Cash Flow fields
    const cashFromOperatingActivities = parseNum(safeFind(cas, 'CashfromOperatingActivities').value);
    const capitalExpenditures = Math.abs(parseNum(safeFind(cas, 'CapitalExpenditures').value));

    // Current Price and 52 Week High/Low
    const currentPrice = parseNum(apiData.currentPrice?.NSE || apiData.currentPrice?.BSE || apiData.currentPrice || 0);
    const yearHigh = parseNum(apiData.yearHigh || peerCompany.yhigh || 0);
    const yearLow = parseNum(apiData.yearLow || peerCompany.ylow || 0);
    // Current Price
    const enterpriseValue = marketCap + totalDebt - cash;
    const assetTurnover = totalAssets ? (totalRevenue / totalAssets) : 0;
    const inventoryTurnover = totalInventory ? (costOfRevenueTotal / totalInventory) : 0;
    const receivablesTurnover = totalReceivablesNet ? (totalRevenue / totalReceivablesNet) : 0;
    const operatingEfficiency = totalOperatingExpense ? (operatingIncome / totalOperatingExpense) : 0;
    const workingCapital = totalCurrentAssets - totalCurrentLiabilities;
    const workingCapitalTurnover = workingCapital ? (totalRevenue / workingCapital) : 0;
    const roa = totalAssets ? ((netIncome / totalAssets) * 100) : 0;
    const grossMargin = totalRevenue ? ((grossProfit / totalRevenue) * 100) : 0;
    const operatingMargin = totalRevenue ? ((operatingIncome / totalRevenue) * 100) : 0;
    const roce = (totalAssets - totalCurrentLiabilities) ? ((operatingIncome / (totalAssets - totalCurrentLiabilities)) * 100) : 0;
    const revenuePerShare = totalCommonShares ? (totalRevenue / totalCommonShares) : 0;
    const psRatio = revenuePerShare ? (currentPrice / revenuePerShare) : 0;
    const currentRatio = totalCurrentLiabilities ? (totalCurrentAssets / totalCurrentLiabilities) : 0;
    const quickRatio = totalCurrentLiabilities ? ((totalCurrentAssets - totalInventory) / totalCurrentLiabilities) : 0;
    const interestCoverage = interestExpense ? (operatingIncome / interestExpense) : 0;
    const fcf = cashFromOperatingActivities - capitalExpenditures;

    return {
      companyName: apiData.companyName || apiData.tickerId || 'Unknown',
      ticker: apiData.tickerId || '',
      industry: apiData.industry || '',
      marketCap: (marketCap / 10000000).toFixed(2),
      enterpriseValue: (enterpriseValue / 10000000).toFixed(2),
      currentPrice: currentPrice.toFixed(2),
      yearHigh: yearHigh.toFixed(2),
      yearLow: yearLow.toFixed(2),
      assetTurnover: assetTurnover.toFixed(2),
      inventoryTurnover: inventoryTurnover.toFixed(2),
      receivablesTurnover: receivablesTurnover.toFixed(2),
      operatingEfficiency: (operatingEfficiency * 100).toFixed(2),
      workingCapitalTurnover: workingCapitalTurnover.toFixed(2),
      roa: roa.toFixed(2),
      roe: roe.toFixed(2),
      grossMargin: grossMargin.toFixed(2),
      operatingMargin: operatingMargin.toFixed(2),
      netProfitMargin: netProfitMargin.toFixed(2),
      roce: roce.toFixed(2),
      eps: eps.toFixed(2),
      peRatio: peRatio.toFixed(2),
      pbRatio: pbRatio.toFixed(2),
      psRatio: psRatio.toFixed(2),
      debtToEquity: debtToEquity.toFixed(2),
      currentRatio: currentRatio.toFixed(2),
      quickRatio: quickRatio.toFixed(2),
      interestCoverage: interestCoverage.toFixed(2),
      fcf: (fcf / 10000000).toFixed(2),
    };
  };

  // Map the 5/3/1 scoring from your Excel table to a 1-9 scale for compatibility with
  // the existing aggregation logic (1 = worst, 9 = best). We use absolute thresholds
  // defined per metric key. Some metrics (EPS trend, EV/EBITDA) require historical or
  // different inputs; for those we use reasonable fallbacks and document assumptions.
  const calculateMetricScore = (metricKey, value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return 0;

    // helper to map tier (5/3/1) -> score (keep original 5/3/1 as requested)
    const tierToScore = (tier) => {
      if (tier === 5) return 5;
      if (tier === 3) return 3;
      return 1; // tier 1
    };

    switch (metricKey) {
      // Valuation
      case 'marketCap': {
        // input is displayed in crores (₹ Cr)
        if (num > 50000) return tierToScore(5);
        if (num >= 10000) return tierToScore(3);
        return tierToScore(1);
      }
      case 'enterpriseValue': {
        // Excel expects EV/EBITDA. We don't have EBITDA reliably; fallback: if
        // operatingIncome exists elsewhere it would be better. Here we treat
        // enterpriseValue as neutral and return medium score when missing context.
        return tierToScore(3);
      }
      case 'currentPrice':
      case 'yearHigh':
      case 'yearLow':
        // These are contextual — keep neutral/medium score and let UI/context guide
        return tierToScore(3);

      // Efficiency
      case 'assetTurnover':
        if (num > 1.0) return tierToScore(5);
        if (num >= 0.5) return tierToScore(3);
        return tierToScore(1);
      case 'inventoryTurnover':
        if (num > 6) return tierToScore(5);
        if (num >= 3) return tierToScore(3);
        return tierToScore(1);
      case 'receivablesTurnover':
        if (num > 8) return tierToScore(5);
        if (num >= 4) return tierToScore(3);
        return tierToScore(1);
      case 'operatingEfficiency':
        // operatingEfficiency in code is a ratio (0-1) then multiplied by 100 before display
        // but stored as percent in returned object. Our comp values are strings; ensure consistent input.
        if (num > 80) return tierToScore(5);
        if (num >= 60) return tierToScore(3);
        return tierToScore(1);
      case 'workingCapitalTurnover':
        if (num > 4) return tierToScore(5);
        if (num >= 2) return tierToScore(3);
        return tierToScore(1);

      // Profitability
      case 'roa':
        if (num > 10) return tierToScore(5);
        if (num >= 5) return tierToScore(3);
        return tierToScore(1);
      case 'roe':
        if (num > 15) return tierToScore(5);
        if (num >= 8) return tierToScore(3);
        return tierToScore(1);
      case 'grossMargin':
        if (num > 40) return tierToScore(5);
        if (num >= 20) return tierToScore(3);
        return tierToScore(1);
      case 'operatingMargin':
        if (num > 20) return tierToScore(5);
        if (num >= 10) return tierToScore(3);
        return tierToScore(1);
      case 'netProfitMargin':
        if (num > 15) return tierToScore(5);
        if (num >= 5) return tierToScore(3);
        return tierToScore(1);
      case 'roce':
        if (num > 18) return tierToScore(5);
        if (num >= 10) return tierToScore(3);
        return tierToScore(1);

      // Per share
      case 'eps': {
        // Excel wants a rising trend; we don't have historical EPS here. As a
        // conservative fallback, treat positive EPS as medium (3) and strongly
        // positive EPS (above median across companies) as good (5).
        if (num <= 0) return tierToScore(1);
        return tierToScore(3);
      }
      case 'peRatio':
        if (num >= 10 && num <= 20) return tierToScore(5);
        if (num > 20 && num <= 30) return tierToScore(3);
        return tierToScore(1);
      case 'pbRatio':
        if (num >= 1 && num <= 3) return tierToScore(5);
        if (num > 3 && num <= 5) return tierToScore(3);
        return tierToScore(1);
      case 'psRatio':
        if (num >= 1 && num <= 2) return tierToScore(5);
        if (num > 2 && num <= 4) return tierToScore(3);
        return tierToScore(1);

      // Financial health
      case 'debtToEquity':
        if (num < 0.5) return tierToScore(5);
        if (num <= 1.0) return tierToScore(3);
        return tierToScore(1);
      case 'currentRatio':
        if (num > 2.0) return tierToScore(5);
        if (num >= 1.0) return tierToScore(3);
        return tierToScore(1);
      case 'quickRatio':
        if (num > 1.0) return tierToScore(5);
        if (num >= 0.5) return tierToScore(3);
        return tierToScore(1);
      case 'interestCoverage':
        if (num > 5) return tierToScore(5);
        if (num >= 2) return tierToScore(3);
        return tierToScore(1);
      case 'fcf':
        // Free cash flow: positive & rising is best; lacking trend information
        // we treat positive FCF as medium (3) and negative as poor (1).
        if (num > 0) return tierToScore(3);
        return tierToScore(1);

      default:
        return tierToScore(3); // neutral
    }
  };

  const calculateAggregatedScore = (companyData) => {
    let totalScore = 0;
    let totalWeight = 0;

    defaultMetrics.forEach(section => {
      section.items.forEach(metric => {
        // Include neutral metrics as well — user can now assign weights to them
        const score = calculateMetricScore(metric.key, companyData[metric.key]);
        const weight = useCustomWeights && customWeights[metric.key] !== undefined ? (parseFloat(customWeights[metric.key]) || 0) : 4;
        totalScore += score * weight;
        totalWeight += weight;
      });
    });

    return totalWeight > 0 ? (totalScore / totalWeight).toFixed(2) : '0.00';
  };

  const fetchStockData = async (companyName) => {
    try {
      const response = await fetch(`https://stock.indianapi.in/stock?name=${encodeURIComponent(companyName)}`, {
        headers: {
          'X-Api-Key': 'sk-live-x4kuY7ESmHP05Y3JAgvKXnRgLkdzrXIlEkwLqr5T'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      return calculateMetrics(result);
    } catch (err) {
      throw err;
    }
  };

  const handleAddCompany = async () => {
    if (!company.trim()) {
      setError('Please enter a company name');
      return;
    }

    if (companies.some(c => c.companyName.toLowerCase() === company.toLowerCase())) {
      setError('Company already added');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const metrics = await fetchStockData(company);
      setCompanies([...companies, metrics]);
      setCompany('');
    } catch (err) {
      setError(err.message || 'Failed to fetch company data');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCompany = (index) => {
    setCompanies(companies.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCompany();
    }
  };

  const handleWeightChange = (key, value) => {
    // Store the raw input so empty string is preserved (user cleared input)
    // Only accept numeric input or empty string
    if (value === '') {
      setCustomWeights({ ...customWeights, [key]: '' });
      return;
    }
    // Allow numeric strings (including '0')
    const maybeNum = parseFloat(value);
    if (isNaN(maybeNum)) return; // ignore invalid entries
    setCustomWeights({ ...customWeights, [key]: value });
  };

    const getTotalWeight = () => {
    // Include all metrics with a default weight of 4
    const allMetrics = defaultMetrics.flatMap(section => section.items);
    return allMetrics.reduce((sum, metric) => {
      const raw = customWeights[metric.key];
      if (raw === undefined) {
        return sum + 4; // Default weight of 4 for all metrics
      }
      // if user cleared input (raw === ''), treat as 0 for calculation but show blank in input
      if (raw === '') return sum + 0;
      const n = parseFloat(raw);
      return sum + (Number.isFinite(n) ? n : 4);
    }, 0);
  };

  const handleApplyWeights = () => {
    const total = getTotalWeight();
    if (total !== 100) {
      alert(`Total weight must be 100. Current total: ${total}`);
      return;
    }
    setUseCustomWeights(true);
    setShowWeightModal(false);
  };

  const resetToDefaultWeights = () => {
    setCustomWeights({});
    setUseCustomWeights(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <h1 style={styles.title}>Stock Metrics Comparison</h1>
          <p style={styles.subtitle}>Compare financial metrics across multiple companies with aggregated scoring</p>
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
              onClick={handleAddCompany}
              disabled={loading}
              style={{...styles.addButton, ...(loading ? styles.buttonDisabled : {})}}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#059669')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#10b981')}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Add Company
                </>
              )}
            </button>
            <button
              onClick={() => setShowWeightModal(true)}
              style={styles.settingsButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#4f46e5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
            >
              <Settings size={20} />
              Customize Weights
            </button>
            <button
              onClick={() => setShowFAQModal(true)}
              style={{...styles.settingsButton, backgroundColor: '#06b6d4'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0891b2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#06b6d4'}
            >
              <AlertCircle size={20} />
              FAQs
            </button>
          </div>
          {error && (
            <div style={styles.error}>
              <AlertCircle size={20} color="#b91c1c" />
              <p style={styles.errorText}>{error}</p>
            </div>
          )}
        </div>

        {companies.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={{...styles.th, ...styles.companyHeader}}>Metric</th>
                  {companies.map((comp, index) => (
                    <th key={index} style={styles.th}>
                      <div style={styles.companyInfo}>
                        <span style={styles.companyName}>{comp.companyName}</span>
                        <span style={styles.companyDetails}>
                          {comp.ticker} {comp.industry && `| ${comp.industry}`}
                        </span>
                        <button
                          onClick={() => handleRemoveCompany(index)}
                          style={styles.removeButton}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={styles.scoreRow}>
                  <td style={{...styles.td, ...styles.companyCell, backgroundColor: '#fef3c7'}}>
                    <strong>Aggregated Score (1-10)</strong>
                  </td>
                  {companies.map((comp, index) => (
                    <td key={index} style={{...styles.td, backgroundColor: '#fef3c7'}}>
                      <strong>{calculateAggregatedScore(comp)}</strong>
                    </td>
                  ))}
                </tr>
                {defaultMetrics.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr>
                      <td colSpan={companies.length + 1} style={{...styles.td, ...styles.thCategory}}>
                        {section.category} Metrics
                      </td>
                    </tr>
                    {section.items.map((metric) => (
                      <tr key={metric.key}>
                        <td style={{...styles.td, ...styles.companyCell}}>{metric.label}</td>
                        {companies.map((comp, index) => {
                          const value = comp[metric.key];
                          const displayValue = value && value !== '0.00' ? `${metric.unit || ''}${value}` : 'N/A';
                          return (
                            <td key={index} style={styles.td}>{displayValue}</td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <TrendingUp size={64} color="#d1d5db" />
            <p style={styles.emptyText}>Add companies to start comparing their metrics</p>
          </div>
        )}
      </div>

      {showWeightModal && (
        <div style={styles.modalOverlay} onClick={() => setShowWeightModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Customize Metric Weights</h2>
              <button style={styles.closeButton} onClick={() => setShowWeightModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.totalWeight}>
              Total Weight: {getTotalWeight()} / 100
              {getTotalWeight() !== 100 && (
                <div style={{color: '#ef4444', fontSize: '14px', marginTop: '8px'}}>
                  ⚠ Total must equal 100 to apply
                </div>
              )}
            </div>

            {defaultMetrics.map((section) => (
              <div key={section.category} style={styles.weightSection}>
                <div style={styles.sectionTitle}>{section.category}</div>
                {section.items.map((metric) => (
                  <div key={metric.key} style={styles.weightItem}>
                    <span style={styles.weightLabel}>
                      {metric.label}
                      {metric.scoreLogic === 'neutral' && (
                        <span style={{fontSize: '12px', color: '#6b7280', marginLeft: 8}}>(neutral)</span>
                      )}
                    </span>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={customWeights[metric.key] ?? 4}
                      onChange={(e) => handleWeightChange(metric.key, e.target.value)}
                      style={styles.weightInput}
                    />
                  </div>
                ))}
              </div>
            ))}

            <div style={styles.modalButtons}>
              <button
                onClick={resetToDefaultWeights}
                style={styles.resetButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
              >
                Reset to Default (4 each)
              </button>
              <button
                onClick={handleApplyWeights}
                disabled={getTotalWeight() !== 100}
                style={{
                  ...styles.applyButton,
                  ...(getTotalWeight() !== 100 ? styles.buttonDisabled : {})
                }}
                onMouseEnter={(e) => { if (getTotalWeight() === 100) e.target.style.backgroundColor = '#059669' }}
                onMouseLeave={(e) => { if (getTotalWeight() === 100) e.target.style.backgroundColor = '#10b981' }}
              >
                Apply Weights
              </button>
            </div>
          </div>
        </div>
      )}
      {showFAQModal && (
        <div style={styles.modalOverlay} onClick={() => setShowFAQModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Frequently Asked Questions</h2>
              <button style={styles.closeButton} onClick={() => setShowFAQModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={{maxHeight: '60vh', overflow: 'auto'}}>
              {/* Reuse the existing FAQ page component inside the modal */}
              <FAQs />
            </div>
          </div>
        </div>
      )}
      
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