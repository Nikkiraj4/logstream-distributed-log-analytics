# LogStream — Distributed Log Analytics & Alerting Platform

LogStream is a distributed log analytics and alerting platform designed to ingest, index, search, analyze, monitor, and visualize application logs from distributed services.

The project combines a Java/Spring Boot backend with Apache Lucene, gRPC-based log ingestion, scheduled alert evaluation, WebSocket-based live log streaming, and a React analytics dashboard.

---

## Overview

Modern applications generate a large number of logs from different services. Searching through raw log files and identifying important events manually can become difficult as the volume of logs increases.

LogStream provides a centralized platform where logs can be:

- Ingested through gRPC
- Validated and indexed using Apache Lucene
- Searched through REST APIs
- Analyzed by log level and service
- Aggregated over time
- Monitored using configurable alert rules
- Streamed in real time through WebSockets
- Visualized through a React dashboard

The project was developed as an academic implementation of a distributed log analytics and alerting system.

---

## Key Features

### 1. Log Ingestion

Logs are received by the Java backend through gRPC.

Each log contains information such as:

- Timestamp
- Service
- Log level
- Message

The backend validates the incoming log before indexing it.

---

### 2. Apache Lucene Search & Indexing

Apache Lucene is used as the search and indexing engine.

Logs are stored as Lucene documents and can be searched based on available log fields.

The search system supports filtering logs and retrieving matching results through the backend API.

The normal search operation limits returned results to a maximum of 100 records, while separate counting operations are used for analytics and alert evaluation.

---

### 3. Analytics Dashboard

The React dashboard provides visual analytics for the indexed logs.

The dashboard includes:

- Logs by Level
- Logs by Service
- Log Volume over Time

Charts are implemented using Apache ECharts.

The log volume visualization displays the number of logs received per minute over the selected recent time window.

---

### 4. Alerting Engine

LogStream includes a scheduled alert evaluation engine.

Users can configure alert rules with:

- Alert name
- Service
- Condition
- Threshold
- Time window
- Severity
- Enabled/disabled state

Enabled alerts are evaluated periodically by the backend.

The implemented Error Rate condition checks ERROR-level logs within the configured time window and compares the number of matching logs against the configured threshold.

When an alert condition is breached, the system records the triggered state and simulates a webhook notification through the backend console.

---

### 5. Real-Time Live Tail

The Live Tail module provides real-time monitoring of incoming logs.

The backend uses WebSockets to broadcast newly ingested logs to connected clients.

The frontend Live Tail interface provides:

- Connection status
- Real-time incoming logs
- Service filtering
- Log-level filtering
- Pause/Resume controls
- Clear logs functionality

---

## System Architecture

```text
                    +----------------------+
                    |     Log Producer     |
                    |    / gRPC Client     |
                    +----------+-----------+
                               |
                               | gRPC
                               v
                    +----------------------+
                    |   Java / Spring Boot |
                    |       Backend        |
                    +----------+-----------+
                               |
                 +-------------+-------------+
                 |                           |
                 v                           v
        +------------------+       +------------------+
        | Log Ingestion    |       | WebSocket        |
        | Service          |       | Live Tail        |
        +--------+---------+       +--------+---------+
                 |                          |
                 v                          |
        +------------------+                |
        | Apache Lucene    |                |
        | Index            |                |
        +--------+---------+                |
                 |                          |
        +--------+---------+                |
        |                  |                |
        v                  v                |
 +-------------+    +-------------+        |
 | Search APIs |    | Analytics & |        |
 |             |    | Alert Engine|        |
 +------+------+    +------+------+        |
        |                  |                |
        +---------+--------+                |
                  |                         |
                  v                         v
          +--------------------------------------+
          |          React Frontend              |
          |                                      |
          | Dashboard | Search | Alerts | Live  |
          |                         Tail         |
          +--------------------------------------+
