const waveBars = [
  { height: 12, active: false },
  { height: 24, active: true },
  { height: 32, active: true },
  { height: 16, active: true },
  { height: 28, active: true },
  { height: 36, active: true },
  { height: 20, active: true },
  { height: 8, active: false }
];

export function DashboardMockup() {
  return (
    <div className="dashboard-mockup" aria-label="Pocket Ledger preview">
      <div className="mockup-header">
        <span className="mockup-label">Pocket Ledger</span>
        <span className="mockup-label">Live Balance</span>
      </div>
      <div className="mockup-balance">$12,450.00</div>
      <div className="mockup-chart">
        <svg viewBox="0 0 300 100" aria-hidden="true">
          <defs>
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#81e6d9" />
              <stop offset="100%" stopColor="#81e6d9" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="chart-fill" d="M 0 100 L 0 75 Q 50 45 100 65 T 200 25 T 300 10 L 300 100 Z" />
          <path className="chart-path" d="M 0 75 Q 50 45 100 65 T 200 25 T 300 10" />
        </svg>
      </div>
      <div className="mockup-list">
        <div className="mockup-item">
          <span>Starbucks Coffee</span>
          <span className="amount-red">-$6.50</span>
        </div>
        <div className="mockup-item">
          <span>Invoice Payout</span>
          <span className="amount-green">+$450.00</span>
        </div>
      </div>
    </div>
  );
}

export function WaveformMockup() {
  return (
    <div className="waveform-mockup" aria-label="Fieldnote voice memo preview">
      <div className="audio-wave" aria-hidden="true">
        {waveBars.map((bar, index) => (
          <div
            key={`${bar.height}-${index}`}
            className={bar.active ? "wave-bar active" : "wave-bar"}
            style={{ height: bar.height }}
          />
        ))}
      </div>
      <div className="transcript-text">&quot;We need to ship the landing page layout by Friday morning...&quot;</div>
    </div>
  );
}

export function StoreMockup() {
  return (
    <div className="store-mockup" aria-label="Kettlecorn Co. storefront preview">
      <div className="store-product">
        <div className="product-circle" />
        <div className="product-info">
          <span className="product-title">Sweet &amp; Salty</span>
          <span className="product-price">$6.00</span>
        </div>
      </div>
      <div className="store-btn">Add</div>
    </div>
  );
}

export function InvoiceMockup() {
  return (
    <div className="invoice-mockup" aria-label="Tallyframe invoice preview">
      <div className="invoice-header">
        <span>Invoice</span>
        <span>Status</span>
      </div>
      <div className="invoice-row">
        <span className="invoice-id">#INV-204</span>
        <span className="invoice-status status-paid">Paid</span>
      </div>
      <div className="invoice-row">
        <span className="invoice-id">#INV-205</span>
        <span className="invoice-status status-pending">Pending</span>
      </div>
    </div>
  );
}
