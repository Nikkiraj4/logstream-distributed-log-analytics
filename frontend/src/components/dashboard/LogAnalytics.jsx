import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

import {
  getLogLevelAnalytics,
  getServiceAnalytics,
  getLogVolumeAnalytics,
} from "../../services/analyticsService";

const fallbackLevels = [
  { value: 7240, name: "INFO" },
  { value: 324, name: "ERROR" },
  { value: 918, name: "WARN" },
];

const fallbackServices = [
  { value: 4200, name: "billing-api" },
  { value: 3100, name: "payment-service" },
  { value: 2450, name: "order-service" },
  { value: 2732, name: "auth-service" },
];

function normalizeAnalytics(data, fallback) {
  if (!Array.isArray(data) || data.length === 0) {
    return fallback;
  }

  return data.map((item) => ({
    name: item.name,
    value: Number(item.value) || 0,
  }));
}

function normalizeVolume(data) {
  if (!data || typeof data !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(data).map(([time, value]) => [
      time,
      Number(value) || 0,
    ])
  );
}

function LogAnalytics() {
  const [levelData, setLevelData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [volumeData, setVolumeData] = useState({});

  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      try {
        const [levels, services, volume] =
          await Promise.all([
            getLogLevelAnalytics(),
            getServiceAnalytics(),
            getLogVolumeAnalytics(30),
          ]);

        if (!cancelled) {
          setLevelData(
            normalizeAnalytics(levels, fallbackLevels)
          );

          setServiceData(
            normalizeAnalytics(
              services,
              fallbackServices
            )
          );

          setVolumeData(normalizeVolume(volume));

          setUsingFallback(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Analytics API error:", error);

        if (!cancelled) {
          setLevelData(fallbackLevels);
          setServiceData(fallbackServices);
          setVolumeData({});
          setUsingFallback(true);
          setLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Logs by Level
   */
  const levelOption = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} logs ({d}%)",
    },

    legend: {
      bottom: 0,
    },

    series: [
      {
        name: "Log Level",
        type: "pie",
        radius: ["45%", "70%"],
        minAngle: 8,
        avoidLabelOverlap: true,

        itemStyle: {
          borderRadius: 6,
          borderWidth: 2,
        },

        label: {
          show: false,
        },

        data: levelData.map((item) => {
          let itemColor;

          if (item.name.toUpperCase() === "INFO") {
            itemColor = "#3b82f6";
          } else if (item.name.toUpperCase() === "ERROR") {
            itemColor = "#ef4444";
          } else if (item.name.toUpperCase() === "WARN") {
            itemColor = "#f59e0b";
          }

          return {
            ...item,
            itemStyle: itemColor
              ? { color: itemColor }
              : undefined,
          };
        }),
      },
    ],
  };

  /*
   * Logs by Service
   */
  const serviceOption = {
    tooltip: {
      trigger: "axis",
    },

    grid: {
      left: 50,
      right: 20,
      top: 30,
      bottom: 70,
    },

    xAxis: {
      type: "category",
      data: serviceData.map(
        (item) => item.name
      ),

      axisLabel: {
        rotate: 20,
      },
    },

    yAxis: {
      type: "log",
      min: 1,
      axisLabel: {
        formatter: "{value}",
      },
    },

    series: [
      {
        name: "Logs",
        type: "bar",
        data: serviceData.map(
          (item) => item.value
        ),
        barMaxWidth: 45,
      },
    ],
  };

  /*
   * Log Volume
   */
  const volumeLabels = Object.keys(volumeData);
  const volumeValues = Object.values(volumeData);

  const volumeOption = {
    tooltip: {
      trigger: "axis",
    },

    grid: {
      left: 50,
      right: 20,
      top: 30,
      bottom: 50,
    },

    xAxis: {
      type: "category",
      data: volumeLabels,

      axisLabel: {
        rotate: 30,
      },
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        name: "Logs",
        type: "line",
        smooth: true,
        data: volumeValues,
        symbol: "circle",
        symbolSize: 5,

        areaStyle: {
          color: "rgba(99, 102, 241, 0.12)",
        },

        lineStyle: {
          width: 2,
        },
      },
    ],
  };

  return (
    <section className="analytics-section">
      <div className="section-header">
        <div>
          <h2>Log Analytics</h2>

          <p>
            Overview of log distribution across the
            platform
          </p>
        </div>

        {usingFallback && !loading && (
          <span className="analytics-status">
            Demo data
          </span>
        )}
      </div>

      {loading ? (
        <div className="analytics-loading">
          <div className="analytics-loading-card">
            <div className="analytics-spinner" />

            <div className="analytics-loading-content">
              <h3>Loading analytics</h3>

              <p>
                Fetching log metrics and preparing
                dashboard charts...
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="analytics-grid">

          {/* Logs by Level */}
          <div className="analytics-card">
            <h3>Logs by Level</h3>

            <ReactECharts
              option={levelOption}
              style={{
                height: "320px",
                width: "100%",
              }}
            />
          </div>

          {/* Logs by Service */}
          <div className="analytics-card">
            <h3>Logs by Service</h3>

            <ReactECharts
              option={serviceOption}
              style={{
                height: "320px",
                width: "100%",
              }}
            />
          </div>

          {/* Log Volume */}
          <div className="analytics-card analytics-card-wide">
            <h3>Log Volume</h3>

            <p className="analytics-card-description">
              Logs received per minute over the
              last 30 minutes
            </p>

            {volumeLabels.length > 0 ? (
              <ReactECharts
                option={volumeOption}
                style={{
                  height: "320px",
                  width: "100%",
                }}
              />
            ) : (
              <div className="analytics-empty">
                No log volume data available.
              </div>
            )}
          </div>

        </div>
      )}
    </section>
  );
}

export default LogAnalytics;