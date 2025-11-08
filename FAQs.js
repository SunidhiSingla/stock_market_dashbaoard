import React, { useState } from 'react';
import styles from './styles';

const FAQs = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is the ESG Decision Support System (DSS)?",
      answer: (
        <>
          <p>
            Our ESG DSS is a free, Excel-based tool that helps Indian retail investors evaluate 
            stocks using both traditional financial metrics (70% weight) and Environmental, Social, 
            Governance (ESG) factors (30% weight). It combines 51 different metrics into an 
            easy-to-understand scoring system (1-5 scale) specifically designed for middle-class investors 
            who want to invest responsibly while maximizing long-term returns.
          </p>
          <h4>Key Features:</h4>
          <ul>
            <li>Combines 51 financial and ESG metrics</li>
            <li>User-friendly scoring system (1-5 scale)</li>
            <li>70% weightage to financial metrics, 30% to ESG factors</li>
            <li>Designed specifically for Indian retail investors</li>
            <li>Completely free with no subscription costs</li>
            <li>Excel-based for transparency and customization</li>
          </ul>
        </>
      )
    },
    {
      id: 2,
      question: "Who can use this tool?",
      answer: (
        <>
          <h4>Primary Target Audience:</h4>
          <ul>
            <li>Indian middle-class retail investors (₹1-50 Lakhs annual investment capacity)</li>
            <li>Age Group: Primarily 25-45 year professionals seeking long-term wealth creation</li>
            <li>Investment Experience: Both beginners and experienced investors</li>
            <li>Technical Skills: Basic Excel users (no advanced technical skills required)</li>
          </ul>
          <h4>Specific User Categories:</h4>
          <ul>
            <li>Beginners: Those new to fundamental analysis or ESG investing</li>
            <li>Experienced Investors: Those wanting to integrate sustainability factors systematically</li>
            <li>Professional investors: Looking for a systematic ESG evaluation framework</li>
            <li>Students and researchers: For educational and academic purposes</li>
          </ul>
        </>
      )
    },
    {
      id: 3,
      question: "How does the tool work?",
      answer: (
        <>
          <p>The tool operates through a systematic scoring methodology:</p>
          <h4>Data Collection:</h4>
          <ul>
            <li>Gathers financial data from company reports and reliable sources</li>
            <li>Collects ESG data from SEBI BRSR filings and sustainability reports</li>
            <li>Uses 51 different metrics across financial and ESG categories</li>
          </ul>
          <h4>Scoring Process:</h4>
          <ul>
            <li>Each metric is scored on a 1-5 scale (5=Excellent, 1=Poor)</li>
            <li>Financial metrics receive 70% weightage in overall score</li>
            <li>ESG metrics receive 30% weightage in overall score</li>
            <li>Automatic calculation and ranking of companies</li>
          </ul>
          <h4>Output Generation:</h4>
          <ul>
            <li>Overall company score (1-5 scale)</li>
            <li>Detailed breakdown by category (financial vs ESG)</li>
            <li>Comparison rankings within sectors</li>
            <li>Clear visual indicators for easy interpretation</li>
          </ul>
        </>
      )
    }
    ,
    {
      id: 4,
      question: "What are the different ways it can be used?",
      answer: (
        <>
          <p>Multiple Usage Methodologies:</p>
          <h4>For Beginners:</h4>
          <ul>
            <li>Start with overall scores to identify high-quality companies</li>
            <li>Use as initial screening tool to shortlist 5-10 companies</li>
            <li>Compare companies within same sector only</li>
            <li>Focus on companies scoring &gt;3.5/5 overall</li>
          </ul>
          <h4>For Advanced Users:</h4>
          <ul>
            <li>Customize weightages based on investment philosophy</li>
            <li>Adjust sector-specific scoring thresholds</li>
            <li>Modify metrics based on risk tolerance and investment horizon</li>
            <li>Add custom metrics for specific analysis needs</li>
          </ul>
          <h4>Portfolio Applications:</h4>
          <ul>
            <li>Core-Satellite strategy using high ESG scoring companies as core holdings</li>
            <li>Sector rotation based on comparative leadership rankings</li>
            <li>ESG integration by replacing low-scoring holdings</li>
            <li>Risk management using financial health metrics</li>
            <li>Thematic investing focusing on specific ESG themes</li>
          </ul>
        </>
      )
    },
    {
      id: 5,
      question: "What are the tool's main limitations?",
      answer: (
        <>
          <p>Key Limitations to Consider:</p>
          <h4>Data-Related Constraints:</h4>
          <ul>
            <li>Data lag: Financial and ESG data is typically 3-6 months old</li>
            <li>Manual updates required (no live data feeds)</li>
            <li>Limited company coverage (~50 large-cap Indian companies initially)</li>
            <li>Dependent on quality of company disclosures</li>
          </ul>
          <h4>Methodological Limitations:</h4>
          <ul>
            <li>Sector bias may favor industries with better ESG disclosure practices</li>
            <li>Some ESG metrics involve subjective qualitative judgment</li>
            <li>May not capture all market dynamics and external factors</li>
            <li>Scoring methodology may not suit all investment philosophies</li>
          </ul>
          <h4>Usage Constraints:</h4>
          <ul>
            <li>Not a substitute for comprehensive investment research</li>
            <li>Does not provide specific buy/sell recommendations or price targets</li>
            <li>Should be combined with other research and analysis tools</li>
            <li>Requires regular manual data updates for accuracy</li>
            <li>Cannot predict market timing or short-term price movements</li>
          </ul>
          <p><strong>Important:</strong> This tool is for screening and analysis only - not for making final investment decisions.</p>
        </>
      )
    },
    {
      id: 6,
      question: "What is the stock market, and how does investing in stocks work?",
      answer: (
        <>
          <p><strong>What is the Stock Market?</strong></p>
          <ul>
            <li>A platform where shares of publicly listed companies are traded</li>
            <li>Operates through exchanges like NSE (National Stock Exchange) and BSE (Bombay Stock Exchange)</li>
            <li>Regulated by SEBI (Securities and Exchange Board of India)</li>
            <li>Provides a transparent, secure environment for buying and selling shares</li>
          </ul>
          <h4>How Stock Investing Works:</h4>
          <ul>
            <li>When you buy stocks, you purchase ownership stakes in companies</li>
            <li>As a shareholder, you benefit from company growth and profits</li>
            <li>Returns come through: Capital appreciation (stock price increases) and dividends (profit sharing)</li>
            <li>Stock prices fluctuate based on company performance, market conditions, and investor sentiment</li>
          </ul>
          <h4>Investment Process:</h4>
          <ul>
            <li>Open a Demat and trading account with a registered broker</li>
            <li>Research and select companies based on fundamental analysis</li>
            <li>Place buy/sell orders through your broker's platform</li>
            <li>Hold shares in electronic form in your Demat account</li>
          </ul>
        </>
      )
    },
    {
      id: 7,
      question: "What's the difference between investing and trading?",
      answer: (
        <>
          <p><strong>Time Horizon:</strong></p>
          <ul>
            <li>Investing: Long-term focus (years to decades)</li>
            <li>Trading: Short-term focus (minutes, days, weeks, or months)</li>
          </ul>
          <h4>Goals & Approach:</h4>
          <ul>
            <li>Investing: Wealth creation through capital appreciation and dividends over time</li>
            <li>Trading: Quick profits from short-term price movements</li>
            <li>Investing: Buy-and-hold strategy based on company fundamentals</li>
            <li>Trading: Frequent buying and selling based on price movements and technical analysis</li>
          </ul>
          <h4>Who Should Choose What:</h4>
          <ul>
            <li>Choose Investing if you want steady wealth growth and have limited time for market monitoring</li>
            <li>Choose Trading if you can handle higher risks and have time for active monitoring</li>
          </ul>
        </>
      )
    },
    {
      id: 8,
      question: "How much money do I need to start investing?",
      answer: (
        <>
          <p><strong>No Fixed Minimum:</strong> Indian stock market has no mandatory minimum investment amount — you can technically start with as little as ₹100-₹500.</p>
          <h4>Practical Starting Amounts:</h4>
          <ul>
            <li>Direct Stocks: ₹5,000-₹10,000 for basic diversification across 3-5 stocks</li>
            <li>Mutual Fund SIPs: As low as ₹100-₹500 per month</li>
            <li>Index Funds/ETFs: ₹1,000-₹5,000 for initial investment</li>
          </ul>
          <h4>Recommended Approach for Beginners:</h4>
          <ul>
            <li>Start with ₹1,000-₹5,000 initially to learn the process</li>
            <li>Begin with mutual fund SIPs of ₹1,000-₹3,000 per month</li>
            <li>Gradually increase investment amounts as income and knowledge grow</li>
          </ul>
        </>
      )
    },
    {
      id: 9,
      question: "What's the minimum amount I can invest in stocks in India?",
      answer: (
        <>
          <p><strong>Individual Stock Investment:</strong> Minimum investment = Price of 1 share of the company. Stock prices range widely (₹1 to ₹75,000+).</p>
          <h4>Practical Considerations & Strategies:</h4>
          <ul>
            <li>Very small investments (under ₹1,000) may not be cost-effective due to brokerage charges</li>
            <li>Consider fractional investing via mutual funds/ETFs or SIPs to build positions</li>
            <li>For individual stocks: aim for ₹5,000-₹10,000 per transaction to minimize fixed-cost impact</li>
          </ul>
        </>
      )
    },
    {
      id: 10,
      question: "Should I open a Demat and Trading account first? How do I choose a broker?",
      answer: (
        <>
          <p><strong>Why Both Accounts Are Necessary:</strong></p>
          <ul>
            <li>Demat Account: Holds your shares in electronic form</li>
            <li>Trading Account: Enables buying and selling on exchanges</li>
            <li>Both must be linked to your bank account for fund transfers</li>
          </ul>
          <h4>How to Choose a Broker:</h4>
          <ul>
            <li>Consider brokerage charges, account opening charges, AMC, and other fees</li>
            <li>Evaluate platform reliability, customer support, research, and mobile app features</li>
            <li>Start with a discount broker for low costs or a full-service broker if you want advisory support</li>
          </ul>
        </>
      )
    }
    ,
    {
      id: 11,
      question: "How much tax will I have to pay on stock market returns?",
      answer: (
        <>
          <p><strong>Taxation on Stock Market Returns (As per Budget 2024):</strong></p>
          <h4>Short-Term Capital Gains (STCG):</h4>
          <ul>
            <li>Holding Period: Shares held for 12 months or less</li>
            <li>Tax Rate: 20% (increased from 15% in Budget 2024)</li>
            <li>Applicable on: Listed equity shares where STT is paid</li>
            <li>No indexation benefit available</li>
          </ul>
          <h4>Long-Term Capital Gains (LTCG):</h4>
          <ul>
            <li>Holding Period: Shares held for more than 12 months</li>
            <li>Tax Rate: 12.5% (increased from 10% in Budget 2024)</li>
            <li>Exemption: First ₹1.25 lakh of LTCG per financial year is tax-free</li>
            <li>No indexation benefit for equity shares</li>
          </ul>
          <h4>Dividend Taxation:</h4>
          <ul>
            <li>Dividends received from Indian companies are taxable as per your income tax slab</li>
            <li>TDS deducted at source if dividend exceeds ₹5,000 in a financial year</li>
            <li>TDS Rate: 10% (can be higher if PAN not provided)</li>
          </ul>
          <h4>Tax Calculation Examples:</h4>
          <ul>
            <li><strong>STCG Example:</strong> Purchase ₹1,00,000 → Sale ₹1,50,000 (within 12 months) → Gain ₹50,000 → Tax ₹10,000 (20%)</li>
            <li><strong>LTCG Example:</strong> Purchase ₹2,00,000 → Sale ₹4,00,000 (after 12+ months) → Gain ₹2,00,000 → Taxable ₹75,000 (after ₹1.25L exemption) → Tax ₹9,375 (12.5%)</li>
          </ul>
          <h4>Tax Saving Strategies:</h4>
          <ul>
            <li>Hold shares for more than 12 months to benefit from lower LTCG rates</li>
            <li>Utilize the ₹1.25 lakh LTCG exemption each financial year</li>
            <li>Use tax-loss harvesting to offset gains with losses</li>
            <li>Plan timing of sales to optimize tax liability and keep accurate records</li>
          </ul>
        </>
      )
    },
    {
      id: 12,
      question: "What is the safest way to start investing without losing my money?",
      answer: (
        <>
          <p><strong>Safe Investment Strategies for Beginners:</strong></p>
          <h4>Start with the Right Foundation:</h4>
          <ul>
            <li>Build an emergency fund first: 6-12 months of expenses</li>
            <li>Only invest surplus money that you won't need for 5+ years</li>
            <li>Start small: Begin with 5-10% of your monthly income</li>
            <li>Educate yourself before investing</li>
          </ul>
          <h4>Low-Risk Options & Strategies:</h4>
          <ul>
            <li>Index Funds/ETFs for instant diversification and low fees</li>
            <li>Large-cap mutual funds for stability and professional management</li>
            <li>Blue-chip stocks for steady growth and dividends</li>
            <li>Use SIPs to reduce timing risk and build discipline</li>
          </ul>
          <h4>Risk Management:</h4>
          <ul>
            <li>Diversify across sectors and asset classes</li>
            <li>Maintain a long-term approach (5+ years)</li>
            <li>Regularly review and rebalance your portfolio</li>
            <li>Avoid tips, penny stocks, and speculative bets early on</li>
          </ul>
        </>
      )
    },
    {
      id: 13,
      question: "Is it better to start with mutual funds or direct stocks as a beginner?",
      answer: (
        <>
          <p><strong>Mutual Funds - Recommended for Beginners:</strong></p>
          <ul>
            <li>Professional management and instant diversification</li>
            <li>Lower minimum investments via SIPs (₹100+)</li>
            <li>Less research burden and emotional trading</li>
          </ul>
          <p><strong>Direct Stocks - For Experienced Beginners:</strong></p>
          <ul>
            <li>Consider after 1-2 years of mutual fund experience</li>
            <li>Higher potential returns but higher time/skill requirement</li>
            <li>Recommended approach: mix mutual funds with a small allocation to direct stocks</li>
          </ul>
        </>
      )
    },
    {
      id: 14,
      question: "What's the difference between NSE and BSE? Does it matter where I buy my stocks?",
      answer: (
        <>
          <p><strong>NSE vs BSE — Key Points:</strong></p>
          <ul>
            <li>NSE: Larger trading volumes and better liquidity</li>
            <li>BSE: Older exchange with more listed companies (including smaller firms)</li>
            <li>Both are regulated by SEBI and provide protected trading environments</li>
          </ul>
          <h4>Does it Matter?</h4>
          <ul>
            <li>For most retail investors, no — brokers route orders to the best price</li>
            <li>Some small-cap stocks may be listed only on BSE</li>
            <li>Focus on stock selection and broker choice rather than exchange</li>
          </ul>
        </>
      )
    }
    ,
    {
      id: 15,
      question: "Should I invest a lump sum or start with SIPs?",
      answer: (
        <>
          <p><strong>SIP vs Lump Sum Investment Decision Guide</strong></p>
          <h4>Systematic Investment Plan (SIP)</h4>
          <ul>
            <li>Fixed amount invested at regular intervals (monthly/quarterly)</li>
            <li>Can start with as low as ₹500-₹1,000 per month</li>
            <li>Automated process reduces emotional decisions</li>
            <li>Advantages: rupee cost averaging, discipline, lower entry barrier, flexibility</li>
            <li>Best for: beginners, risk-averse investors, those with regular income</li>
          </ul>
          <h4>Lump Sum Investment</h4>
          <ul>
            <li>Investing a large amount at once; immediate full market exposure</li>
            <li>Advantages: higher potential returns if timed well, lower transaction costs</li>
            <li>Best for: experienced investors, those with surplus funds or windfalls</li>
          </ul>
          <h4>Decision Framework & Hybrid Approach</h4>
          <ul>
            <li>Choose SIP if you prefer discipline, rupee cost averaging, and lower timing risk</li>
            <li>Choose lump sum if you can identify undervalued conditions and accept higher short-term volatility</li>
            <li>Hybrid: use SIP for majority (e.g., 70%) and keep some for lump-sum opportunities (30%)</li>
          </ul>
        </>
      )
    },
    {
      id: 16,
      question: "If my goal is to build wealth over 10+ years, what kind of stocks should I choose?",
      answer: (
        <>
          <p><strong>Long-Term Wealth Creation Stock Selection Strategy</strong></p>
          <h4>Quality Growth Stocks</h4>
          <ul>
            <li>Consistent revenue and profit growth (15-20% annually over 5+ years)</li>
            <li>Strong ROE (15%+), low debt-to-equity (preferably &lt;0.5)</li>
            <li>Sustainable competitive advantages (moats) and strong management</li>
          </ul>
          <h4>Portfolio Allocation Example</h4>
          <ul>
            <li>40% Large-cap growth; 20% Large-cap dividend; 25% Mid-cap growth; 10% Small-cap; 5% International</li>
          </ul>
          <h4>Principles</h4>
          <ul>
            <li>Power of compounding: reinvest dividends, stay invested through cycles</li>
            <li>Quality over quantity: focus on 15-20 high-quality companies</li>
            <li>Long-term perspective: review and rebalance annually</li>
          </ul>
        </>
      )
    },
    {
      id: 17,
      question: "How do I find multibagger stocks for long-term growth?",
      answer: (
        <>
          <p><strong>Multibagger Stock Identification Strategy</strong></p>
          <h4>Characteristics to Look For</h4>
          <ul>
            <li>Scalable business model, strong moats, consistent 20%+ revenue growth</li>
            <li>Expanding profit margins and high returns on capital</li>
            <li>Strong management with significant skin in the game</li>
          </ul>
          <h4>Research Methodology</h4>
          <ul>
            <li>Screen for high growth and ROE, perform deep due diligence, check industry runway</li>
            <li>Start small, increase position as conviction builds, hold for 5–15 years</li>
          </ul>
        </>
      )
    },
    {
      id: 18,
      question: "How do I pick stocks that give regular dividends?",
      answer: (
        <>
          <p><strong>Dividend Stock Selection Strategy</strong></p>
          <h4>What to Look For</h4>
          <ul>
            <li>Consistent dividend history (5+ years), dividend yield ~3-8%, payout ratio 30-60%</li>
            <li>Positive and growing free cash flow, low debt, stable revenue base</li>
          </ul>
          <h4>Strategies</h4>
          <ul>
            <li>Conservative: focus on 4-6% yield for retirees; Balanced: combine yield with growth</li>
            <li>Use DRIP (dividend reinvestment) to compound returns</li>
          </ul>
        </>
      )
    },
    {
      id: 19,
      question: "How do I invest without losing capital?",
      answer: (
        <>
          <p><strong>Capital Preservation Investment Strategy</strong></p>
          <h4>Fundamental Principles</h4>
          <ul>
            <li>Never invest money you might need within 5 years; maintain emergency fund</li>
            <li>Diversify across asset classes and sectors; start small</li>
          </ul>
          <h4>Low-Risk Options & Portfolio Structure</h4>
          <ul>
            <li>Index funds/ETFs and large-cap mutual funds; conservative allocation example: 60% large-cap, 20% debt, 10% index, 10% cash</li>
            <li>Use SIPs, regular reviews, and avoid leverage and speculative bets</li>
          </ul>
        </>
      )
    },
    {
      id: 20,
      question: "Which financial ratios matter most before buying a stock?",
      answer: (
        <>
          <p><strong>Essential Financial Ratios for Stock Analysis</strong></p>
          <h4>Valuation Ratios</h4>
          <ul>
            <li><strong>Price-to-Earnings (P/E):</strong> Current Price ÷ EPS — good range ~15-25; compare with industry</li>
            <li><strong>Price-to-Book (P/B):</strong> Market Price ÷ Book Value — useful for asset-heavy businesses; good range ~1-3</li>
          </ul>
          <h4>Profitability Ratios</h4>
          <ul>
            <li><strong>Return on Equity (ROE):</strong> Net Income ÷ Shareholders' Equity ×100 — target 15-25%+</li>
            <li><strong>Return on Assets (ROA):</strong> Net Income ÷ Total Assets ×100 — target varies by industry (5-15%)</li>
            <li><strong>Net Profit Margin:</strong> Net Income ÷ Revenue ×100 — healthy range ~10-20%</li>
          </ul>
          <h4>Leverage Ratios</h4>
          <ul>
            <li><strong>Debt-to-Equity:</strong> Total Debt ÷ Total Equity — prefer &lt;1.0 (conservative &lt;0.5)</li>
            <li><strong>Interest Coverage:</strong> EBIT ÷ Interest Expense — &gt;5x is comfortable</li>
          </ul>
          <h4>Efficiency & Growth Ratios</h4>
          <ul>
            <li><strong>Asset Turnover:</strong> Revenue ÷ Average Total Assets — higher is better within sector</li>
            <li><strong>Inventory Turnover:</strong> COGS ÷ Average Inventory — higher indicates efficient inventory management</li>
            <li><strong>Earnings & Revenue Growth Rates:</strong> Look for consistent 15-20% growth over multi-year periods</li>
          </ul>
          <h4>Practical Framework</h4>
          <ol>
            <li>Screen using P/E (~15-25), ROE &gt;15%, Debt/Equity &lt;1.0</li>
            <li>Deep-dive 5-year trends and peer comparisons</li>
            <li>Assess interest coverage, margins, and cash flow quality</li>
          </ol>
          <p><strong>Note:</strong> Ratios work best together—always apply industry context and qualitative checks.</p>
        </>
      )
    },
    {
      id: 21,
      question: "How do I avoid panic selling during a market crash?",
      answer: (
        <>
          <p><strong>Strategies to Avoid Panic Selling</strong></p>
          <h4>Understanding & Prevention</h4>
          <ul>
            <li>Set clear goals and time horizon (5-7 years minimum)</li>
            <li>Maintain an emergency fund so you don't need to liquidate investments</li>
            <li>Diversify across sectors and asset classes</li>
          </ul>
          <h4>Practical Techniques</h4>
          <ul>
            <li>Continue SIPs during downturns to buy more units at lower prices</li>
            <li>Avoid daily portfolio checks; set scheduled reviews instead</li>
            <li>Review fundamentals—sell only if the business thesis has materially changed</li>
          </ul>
          <h4>Emotional Tools</h4>
          <ul>
            <li>Limit news/social media intake during crashes</li>
            <li>Use a checklist to make decisions, not emotions</li>
            <li>Consider a trusted advisor or peer review before making panic-driven moves</li>
          </ul>
        </>
      )
    },
    {
      id: 22,
      question: "How do I deal with FOMO when everyone is buying a trending stock?",
      answer: (
        <>
          <p><strong>Managing FOMO in Investing</strong></p>
          <h4>Recognize the Triggers</h4>
          <ul>
            <li>Social media hype, news headlines, peer conversations</li>
            <li>Understand that success stories are amplified and losses are underreported</li>
          </ul>
          <h4>Prevention & Response</h4>
          <ul>
            <li>Create and follow a written investment plan with allocation limits</li>
            <li>Apply a 48-hour rule: wait, research, then decide</li>
            <li>If you must act, take a small starter position (2-3% of portfolio) and scale only after thorough research</li>
          </ul>
          <h4>Long-Term Mindset</h4>
          <ul>
            <li>Focus on quality businesses and your goals, not short-term trends</li>
            <li>Use systematic approaches (SIPs, diversified funds) to avoid emotional mistakes</li>
          </ul>
        </>
      )
    }
    ,
    {
      id: 23,
      question: "Should I invest when the market is at an all-time high?",
      answer: (
        <>
          <p><strong>Investing During Market Highs: A Strategic Approach</strong></p>
          <h4>Understanding All-Time Highs</h4>
          <ul>
            <li>Markets spend significant time at or near all-time highs during bull runs; this is normal</li>
            <li>All-time highs don't by themselves mean the market is 'over'—time in market matters more than timing</li>
            <li>Historical data shows markets recover and reach new highs frequently over decades</li>
          </ul>
          <h4>Investment Strategies During Highs</h4>
          <ul>
            <li>Continue SIPs regardless of market level to benefit from rupee-cost averaging</li>
            <li>Focus on quality companies with reasonable valuations rather than timing the market</li>
            <li>Consider staggering large investments over 6-12 months if concerned</li>
          </ul>
          <h4>Practical Guidance</h4>
          <ul>
            <li>Do's: keep systematic investments, research thoroughly, maintain long-term perspective</li>
            <li>Don'ts: try to time the market perfectly, stop investing solely because of highs, or make emotional decisions</li>
          </ul>
          <p><strong>Conclusion:</strong> For most retail investors, continue systematic investing and focus on company fundamentals; use highs as a time to review and rebalance rather than to stop investing.</p>
        </>
      )
    }
    // More FAQs can be added here following the same structure
  ];

  const toggleQuestion = (id) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <h1 style={styles.title}>Frequently Asked Questions</h1>
          <p style={styles.subtitle}>Find answers to common questions about our ESG Decision Support System</p>
        </div>

        <div style={styles.faqContainer}>
          {faqs.map((faq) => (
            <div key={faq.id} style={styles.faqItem}>
              <button
                style={{
                  ...styles.faqQuestion,
                  ...(expandedQuestion === faq.id ? styles.faqQuestionExpanded : {})
                }}
                onClick={() => toggleQuestion(faq.id)}
              >
                {faq.question}
                <span style={styles.faqIcon}>{expandedQuestion === faq.id ? '−' : '+'}</span>
              </button>
              {expandedQuestion === faq.id && (
                <div style={styles.faqAnswer}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;