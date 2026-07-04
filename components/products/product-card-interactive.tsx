"use client";

import { useMemo, useState, useRef, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BarChart3Icon,
  BoxIcon,
  Code2Icon,
  FileTextIcon,
  PackageIcon,
  StarIcon,
  TimerIcon,
  ZapIcon,
  type LucideIcon
} from "lucide-react";

import type { CatalogueProduct, ProductIcon } from "@/lib/product-types";
import { getLiveProductMetrics } from "@/app/products/actions";

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

// 12-month calendar labels starting from August 2025 ending in July 2026
const monthNames = [
  "August 2025",
  "September 2025",
  "October 2025",
  "November 2025",
  "December 2025",
  "January 2026",
  "February 2026",
  "March 2026",
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026"
];

// Mapped short abbreviations for the X-axis
const shortMonths = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

type ProductCardProps = {
  product: CatalogueProduct;
};

export function ProductCardInteractive({ product }: ProductCardProps) {
  const [liveRevenue, setLiveRevenue] = useState(product.revenue);
  const [liveChart, setLiveChart] = useState<number[]>(product.chart);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  // Fetch live API metrics if credentials exist
  useEffect(() => {
    setIsClient(true);
    let active = true;

    async function loadMetrics() {
      const data = await getLiveProductMetrics(product.title, product.revenue, product.website);
      if (active) {
        if (data.revenue) {
          // If GitHub stars count is loaded dynamically for OSS, update it
          if (product.category === "oss" && data.stars !== null) {
            setLiveRevenue(`${data.stars.toLocaleString()} ★`);
          } else {
            setLiveRevenue(data.revenue);
          }
        }
        if (data.chart) {
          setLiveChart(data.chart);
        }
      }
    }

    loadMetrics();

    return () => {
      active = false;
    };
  }, [product]);

  // Handle spotlight overlay movement
  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    rectRef.current = event.currentTarget.getBoundingClientRect();
  };

  const handleMouseMoveCard = (event: MouseEvent<HTMLElement>) => {
    if (!rectRef.current) {
      rectRef.current = event.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  // Chart coordinate calculations
  const chartWidth = 340;
  const chartHeight = 90;
  const maxVal = Math.max(...liveChart, 1);
  const minVal = Math.min(...liveChart, 0);
  const range = Math.max(maxVal - minVal, 1);

  const points = useMemo(() => {
    return liveChart.map((value, index) => {
      const x = (index / (liveChart.length - 1)) * chartWidth;
      const y = chartHeight - ((value - minVal) / range) * (chartHeight - 16) - 8;
      return { x, y, value };
    });
  }, [liveChart, minVal, range]);

  const linePath = useMemo(() => {
    return points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
      .join(" ");
  }, [points]);

  const fillPath = useMemo(() => {
    return `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;
  }, [linePath]);

  const gradientId = `graph-fill-${product.slug}`;

  // Interactive scrubbing mouse handlers on the SVG element
  const handleMouseMoveSVG = (event: MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const mouseX = ((event.clientX - svgRect.left) / svgRect.width) * chartWidth;

    const spacing = chartWidth / (liveChart.length - 1);
    const index = Math.min(
      Math.max(Math.round(mouseX / spacing), 0),
      liveChart.length - 1
    );

    setHoveredIndex(index);

    // Position tooltip relative to SVG canvas
    const targetPoint = points[index];
    setTooltipPos({
      x: (targetPoint.x / chartWidth) * svgRect.width,
      y: (targetPoint.y / chartHeight) * svgRect.height
    });
  };

  const handleMouseLeaveSVG = () => {
    setHoveredIndex(null);
  };

  const IconComponent = productIcons[product.icon] ?? Code2Icon;

  return (
    <article
      ref={cardRef}
      className="card interactive-product-card"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMoveCard}
    >
      <div className={`glow-${product.glow}`} />

      {/* Card Header (Product Info & Metric Badge) */}
      <header className="product-card-header">
        <Link href={`/products/${product.slug}`} className="product-card-info-link">
          <div className="product-card-meta-wrap">
            <div className={`product-card-icon-box glow-${product.glow}`}>
              <IconComponent aria-hidden="true" />
            </div>
            <div>
              <h3 className="product-card-title">{product.title}</h3>
              <span className="product-card-kicker">{product.kicker}</span>
            </div>
          </div>
        </Link>

        {/* Live Stripe/GitHub Star Metric Badge */}
        <div className="metrics-badge">
          {product.category === "oss" ? (
            <div className="github-badge" title="Live Github Stars">
              <span className="github-logo-box">★</span>
              <span className="github-text-box">{liveRevenue}</span>
            </div>
          ) : (
            <div className="stripe-badge" title="Stripe Live Revenue (MRR)">
              <span className="stripe-logo-box">S</span>
              <span className="stripe-text-box">{liveRevenue}</span>
            </div>
          )}
        </div>
      </header>

      {/* Description */}
      <p className="product-card-desc">{product.description}</p>

      {/* Interactive Chart Area */}
      <div className="product-card-chart-container">
        {/* Y Axis Grid Marks */}
        <div className="chart-y-axis">
          <span>{product.chartMax}</span>
          <span>{product.chartMid}</span>
        </div>

        <svg
          ref={svgRef}
          className="product-graph-chart interactive-chart"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          onMouseMove={handleMouseMoveSVG}
          onMouseLeave={handleMouseLeaveSVG}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffb020" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffb020" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <g className="product-graph-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <line
                key={`v-${index}`}
                x1={(index * chartWidth) / 5}
                x2={(index * chartWidth) / 5}
                y1="0"
                y2={chartHeight}
              />
            ))}
            {Array.from({ length: 3 }).map((_, index) => (
              <line
                key={`h-${index}`}
                x1="0"
                x2={chartWidth}
                y1={(index * chartHeight) / 2}
                y2={(index * chartHeight) / 2}
              />
            ))}
          </g>

          {/* Area Fill & Line Path */}
          <path d={fillPath} fill={`url(#${gradientId})`} />
          <path d={linePath} className="product-graph-line" />

          {/* Guidelines and target point when scrubbing */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={points[hoveredIndex].x}
                x2={points[hoveredIndex].x}
                y1="0"
                y2={chartHeight}
                className="chart-hover-line"
              />
              <circle
                cx={points[hoveredIndex].x}
                cy={points[hoveredIndex].y}
                r="4.5"
                className="chart-hover-dot"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip Box */}
        <AnimatePresence>
          {isClient && hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.12 }}
              className="chart-tooltip"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y - 12 // Position tooltip exactly above hovered dot
              }}
            >
              <span className="tooltip-date">{monthNames[hoveredIndex]}</span>
              <span className="tooltip-value">
                {product.category === "oss"
                  ? `${Math.round(points[hoveredIndex].value * 42.5)} ★`
                  : `$${points[hoveredIndex].value.toFixed(1)}k`}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Axis Footer */}
      <footer className="product-card-chart-footer" aria-hidden="true">
        {shortMonths.map((m, idx) => (
          <span key={idx}>{m}</span>
        ))}
      </footer>
    </article>
  );
}
