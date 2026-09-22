import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Pause,
  Play,
  Trash2,
  Wifi,
  WifiOff,
} from "lucide-react";
import "./LiveTail.css";

const MAX_LOGS = 200;

function LiveTail() {
  const [logs, setLogs] = useState([]);
  const [connected, setConnected] = useState(false);
  const [paused, setPaused] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("ALL");
  const [levelFilter, setLevelFilter] = useState("ALL");

  const socketRef = useRef(null);
  const pendingLogsRef = useRef([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/livetail");

    socketRef.current = socket;

    socket.onopen = () => {
      setConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const log = JSON.parse(event.data);

        if (paused) {
          pendingLogsRef.current.unshift(log);
          return;
        }

        setLogs((current) => [log, ...current].slice(0, MAX_LOGS));
      } catch (error) {
        console.error("Invalid live log received:", error);
      }
    };

    socket.onclose = () => {
      setConnected(false);
    };

    socket.onerror = () => {
      setConnected(false);
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [paused]);

  function handleResume() {
    setPaused(false);

    if (pendingLogsRef.current.length > 0) {
      setLogs((current) => [
        ...pendingLogsRef.current,
        ...current,
      ].slice(0, MAX_LOGS));

      pendingLogsRef.current = [];
    }
  }

  function handleClear() {
    setLogs([]);
    pendingLogsRef.current = [];
  }

  const services = useMemo(() => {
    const values = logs
      .map((log) => log.service)
      .filter(Boolean);

    return ["ALL", ...new Set(values)];
  }, [logs]);

  const levels = useMemo(() => {
    const values = logs
      .map((log) => log.level)
      .filter(Boolean)
      .map((level) => level.toUpperCase());

    return ["ALL", ...new Set(values)];
  }, [logs]);

  const filteredLogs = logs.filter((log) => {
    const matchesService =
      serviceFilter === "ALL" ||
      log.service === serviceFilter;

    const matchesLevel =
      levelFilter === "ALL" ||
      String(log.level).toUpperCase() === levelFilter;

    return matchesService && matchesLevel;
  });

  return (
    <div className="page-container live-tail-page">
      <div className="page-header">
        <div>
          <div className="live-tail-title">
            <Activity size={22} />
            <h1>Live Tail</h1>
          </div>

          <p>
            Monitor incoming logs in real time from your distributed
            services.
          </p>
        </div>

        <div className="live-tail-status">
          {connected ? (
            <>
              <Wifi size={16} />
              <span>Connected</span>
            </>
          ) : (
            <>
              <WifiOff size={16} />
              <span>Disconnected</span>
            </>
          )}
        </div>
      </div>

      <div className="live-tail-toolbar">
        <div className="live-tail-filters">
          <div className="live-tail-filter">
            <label htmlFor="live-service">Service</label>

            <select
              id="live-service"
              value={serviceFilter}
              onChange={(event) =>
                setServiceFilter(event.target.value)
              }
            >
              {services.map((service) => (
                <option key={service} value={service}>
                  {service === "ALL" ? "All Services" : service}
                </option>
              ))}
            </select>
          </div>

          <div className="live-tail-filter">
            <label htmlFor="live-level">Level</label>

            <select
              id="live-level"
              value={levelFilter}
              onChange={(event) =>
                setLevelFilter(event.target.value)
              }
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === "ALL" ? "All Levels" : level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="live-tail-actions">
          <button
            className="live-tail-control-button"
            onClick={paused ? handleResume : () => setPaused(true)}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
            {paused ? "Resume" : "Pause"}
          </button>

          <button
            className="live-tail-control-button"
            onClick={handleClear}
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>
      </div>

      <section className="live-tail-section">
        <div className="live-tail-section-header">
          <div>
            <h2>Incoming Logs</h2>
            <p>
              {paused
                ? "Live updates are paused."
                : "New logs appear automatically as they are ingested."}
            </p>
          </div>

          <span className="live-log-count">
            {filteredLogs.length} logs
          </span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="live-tail-empty">
            <Activity size={36} />

            <h3>
              {connected
                ? "Waiting for new logs"
                : "Waiting for connection"}
            </h3>

            <p>
              {connected
                ? "Ingest a new log through the gRPC service and it will appear here automatically."
                : "The Live Tail connection to the backend could not be established."}
            </p>
          </div>
        ) : (
          <div className="live-logs-container">
            {filteredLogs.map((log, index) => {
              const level = String(
                log.level || "UNKNOWN"
              ).toUpperCase();

              return (
                <div className="live-log-row" key={`${log.timestamp}-${index}`}>
                  <span className="live-log-time">
                    {log.timestamp
                      ? new Date(log.timestamp).toLocaleTimeString()
                      : "--:--:--"}
                  </span>

                  <span
                    className={`live-log-level live-level-${level.toLowerCase()}`}
                  >
                    {level}
                  </span>

                  <span className="live-log-service">
                    {log.service || "unknown-service"}
                  </span>

                  <span className="live-log-message">
                    {log.message || "No message"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default LiveTail;