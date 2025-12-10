"use client"

import type React from "react"
import { useMemo, useState } from "react"
import styles from "./sales-chart.module.css"

interface SalesData {
  saleRate: string
  product_name: string
}

interface SliceData {
  pathData: string
  color: string
  percentage: string
  name: string
  value: number
  animationDelay: number
  isLowest: boolean
}

export function SalesChart() {
  const rawData: SalesData[] = [
    {
      saleRate: "10.00",
      product_name: "layer 95",
    },
    {
      saleRate: "2.50",
      product_name: "layer 95",
    },
    {
      saleRate: "2.22",
      product_name: "pallet starter",
    },
    {
      saleRate: "4.44",
      product_name: "pallet starter",
    },
    {
      saleRate: "18.75",
      product_name: "premium pack",
    },
    {
      saleRate: "9.30",
      product_name: "basic kit",
    },
    {
      saleRate: "1.50",
      product_name: "sample",
    },
    {
      saleRate: "6.80",
      product_name: "deluxe bundle",
    },
    {
      saleRate: "3.15",
      product_name: "economy set",
    },
    {
      saleRate: "0.99",
      product_name: "trial pack",
    },
  ]

  const chartData = useMemo(() => {
    const aggregated = rawData.reduce(
      (acc, item) => {
        const existing = acc.find((d) => d.name === item.product_name)
        if (existing) {
          existing.value += Number.parseFloat(item.saleRate)
        } else {
          acc.push({
            name: item.product_name,
            value: Number.parseFloat(item.saleRate),
          })
        }
        return acc
      },
      [] as { name: string; value: number }[],
    )
    return aggregated
  }, [])

  const colorGradient = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"]

  const sortedData = useMemo(() => {
    return [...chartData].sort((a, b) => b.value - a.value)
  }, [chartData])

  const total = sortedData.reduce((sum, item) => sum + item.value, 0)
  const minValue = Math.min(...sortedData.map((item) => item.value))

  let currentAngle = -90
  const slices: SliceData[] = sortedData.map((item, index) => {
    const sliceAngle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle

    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1 = 150 + 120 * Math.cos(startRad)
    const y1 = 150 + 120 * Math.sin(startRad)
    const x2 = 150 + 120 * Math.cos(endRad)
    const y2 = 150 + 120 * Math.sin(endRad)

    const largeArc = sliceAngle > 180 ? 1 : 0
    const pathData = [`M 150 150`, `L ${x1} ${y1}`, `A 120 120 0 ${largeArc} 1 ${x2} ${y2}`, "Z"].join(" ")

    const percentage = ((item.value / total) * 100).toFixed(1)
    currentAngle += sliceAngle

    const sliceColor = colorGradient[index % colorGradient.length]
    const animationDelay = item.value === minValue ? 0 : index * 0.15

    return {
      pathData,
      color: sliceColor,
      percentage,
      name: item.name,
      value: item.value,
      animationDelay,
      isLowest: item.value < minValue * 1.5,
    }
  })

  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const handleSliceHover = (index: number, event: React.MouseEvent<SVGPathElement>) => {
    const svg = (event.target as SVGPathElement).closest("svg")
    const rect = svg?.getBoundingClientRect()
    if (rect) {
      setTooltipPos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }
    setHoveredSlice(index)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sales Rate by Product</h2>
        <p className={styles.description}>Hover over the pie slices to see product details</p>
      </div>
      <div className={styles.content}>
        <div className={styles.chartWrapper}>
          <svg viewBox="0 0 300 320" className={styles.chartSvg}>
            {slices.map((slice, index) => (
              <g key={index}>
                <path
                  d={slice.pathData}
                  fill={slice.color}
                  stroke="white"
                  strokeWidth="2"
                  className={styles.pieSlice}
                  onMouseEnter={(e) => handleSliceHover(index, e as unknown as React.MouseEvent<SVGPathElement>)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  style={{
                    opacity: 0,
                  }}
                >
                  <animate
                    attributeName="opacity"
                    values="0;1;1"
                    dur="0.8s"
                    begin={`${slice.animationDelay}s`}
                    fill="freeze"
                  />
                  {slice.isLowest && (
                    <animate attributeName="r" values="0;100;120" dur="0.8s" begin={`${slice.animationDelay}s`} />
                  )}
                </path>
              </g>
            ))}
          </svg>

          {hoveredSlice !== null && (
            <div
              className={styles.tooltipBox}
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y - 80}px`,
                transform: "translateX(-50%)",
              }}
            >
              <div className={styles.tooltipContent}>
                <div className={styles.tooltipTitle}>{slices[hoveredSlice].name}</div>
                <div className={styles.tooltipItem}>
                  Sale Rate: <span className={styles.tooltipItemValue}>${slices[hoveredSlice].value.toFixed(2)}</span>
                </div>
                <div className={styles.tooltipItem}>
                  Percentage: <span className={styles.tooltipPercentage}>{slices[hoveredSlice].percentage}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.productDetails}>
          <h3 className={styles.detailsTitle}>Product Details</h3>
          <div className={styles.detailsGrid}>
            {slices.map((slice, index) => (
              <div
                key={index}
                className={styles.detailItem}
                style={{
                  opacity: 0,
                }}
              >
                <div
                  className={styles.colorIndicator}
                  style={{
                    backgroundColor: slice.color,
                  }}
                />
                <div className={styles.detailContent}>
                  <p className={styles.detailName}>{slice.name}</p>
                  <p className={styles.detailLabel}>
                    Sale Rate: <span className={styles.detailValue}>${slice.value.toFixed(2)}</span>
                  </p>
                  <p className={styles.detailLabel}>
                    Percentage: <span className={styles.detailValue}>{slice.percentage}%</span>
                  </p>
                </div>
                <style>{`
                  @keyframes slideIn {
                    from {
                      opacity: 0;
                      transform: translateY(10px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
