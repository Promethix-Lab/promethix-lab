import {
  BarChart3Icon,
  BoxIcon,
  Code2Icon,
  FileTextIcon,
  FlameIcon,
  GaugeIcon,
  PackageIcon,
  StarIcon,
  TimerIcon,
  ZapIcon,
  type LucideIcon
} from "lucide-react";

import type { CatalogueProduct, ProductIcon } from "@/lib/product-types";

const productIcons: Record<ProductIcon, LucideIcon> = {
  code: Code2Icon,
  bolt: ZapIcon,
  wave: BarChart3Icon,
  invoice: FileTextIcon,
  star: StarIcon,
  timer: TimerIcon,
  package: PackageIcon,
  card: BoxIcon
};

type ProductGraphProps = {
  products: CatalogueProduct[];
};

function ChartLine({ product }: { product: CatalogueProduct }) {
  const width = 340;
  const height = 96;
  const max = Math.max(...product.chart);
  const min = Math.min(...product.chart);
  const range = Math.max(max - min, 1);
  const points = product.chart.map((value, index) => {
    const x = (index / (product.chart.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 18) - 9;
    return { x, y };
  });
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
  const fill = `${line} L ${width} ${height} L 0 ${height} Z`;
  const gradientId = `graph-fill-${product.slug}`;

  return (
    <svg className="product-graph-chart" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffb020" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#ffb020" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="product-graph-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <line key={`v-${index}`} x1={(index * width) / 5} x2={(index * width) / 5} y1="0" y2={height} />
        ))}
        {Array.from({ length: 3 }).map((_, index) => (
          <line key={`h-${index}`} x1="0" x2={width} y1={(index * height) / 2} y2={(index * height) / 2} />
        ))}
      </g>
      <path d={fill} fill={`url(#${gradientId})`} />
      <path d={line} className="product-graph-line" />
    </svg>
  );
}

export function ProductGraph({ products }: ProductGraphProps) {
  return (
    <section className="product-graph-section">
      <div className="wrap">
        <div className="product-graph-layout">
          <aside className="product-graph-profile">
            <div className="product-graph-avatar">
              <FlameIcon aria-hidden="true" />
            </div>
            <h2>Promethix Lab</h2>
            <div className="product-graph-stats">
              <span>Bangalore</span>
              <span>Day 215</span>
            </div>
            <p>
              We publish the public numbers behind what we ship, so every product card has a story beyond a screenshot.
            </p>
            <a href="#catalogue" className="product-graph-cta">
              Browse ships
            </a>
          </aside>

          <div className="product-graph-grid-cards" aria-label="Product growth snapshots">
            {products.slice(0, 6).map((product) => {
              const Icon = productIcons[product.icon] ?? GaugeIcon;

              return (
                <article className="product-graph-card" key={product.slug}>
                  <header>
                    <div className={`product-graph-icon product-graph-icon-${product.glow}`}>
                      <Icon aria-hidden="true" />
                    </div>
                    <div>
                      <h3>{product.title}</h3>
                      <p>{product.description.split(".")[0]}</p>
                    </div>
                    <span>{product.revenue}</span>
                  </header>
                  <div className="product-graph-axis">
                    <span>{product.chartMax}</span>
                    <span>{product.chartMid}</span>
                  </div>
                  <ChartLine product={product} />
                  <div className="product-graph-months" aria-hidden="true">
                    <span>Aug</span>
                    <span>Oct</span>
                    <span>Dec</span>
                    <span>Feb</span>
                    <span>Apr</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
