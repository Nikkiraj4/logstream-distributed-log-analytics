# LogStream ⚡

### Distributed Log Analytics & Alerting Platform

LogStream is a full-stack observability platform for **log ingestion, indexing, search, analytics, alerting, and real-time monitoring**.

**Tech Stack:** Java • Spring Boot • gRPC • Apache Lucene • React • ECharts • WebSockets

---

## 🚀 Features

- 📥 **gRPC Log Ingestion** — Receive and validate logs through gRPC.
- 🔎 **Log Search** — Search and filter indexed logs using Apache Lucene.
- 📊 **Analytics Dashboard** — Visualize logs by level, service, and time.
- 🚨 **Alerting Engine** — Create rules and evaluate them using scheduled tasks.
- ⚡ **Live Tail** — Stream newly ingested logs in real time using WebSockets.
- 🎨 **React UI** — Dashboard, Search Logs, Alerts, and Live Tail interfaces.

---

## 🏗️ Architecture

```text
Log Producer
     │
     │ gRPC
     ▼
Spring Boot Backend
     │
     ├── Log Ingestion
     │       │
     │       ▼
     │   Apache Lucene
     │
     ├── Search
     ├── Analytics
     └── Alert Engine
             │
             ▼
        React Frontend
             │
      ┌──────┼────────┐
      ▼      ▼        ▼
  Dashboard Search   Alerts

Log Ingestion
      │
      │ WebSocket
      ▼
  Live Tail
```

---
 ## 🛠️ Tech Stack
### Backend
- Java
- Spring Boot
- Apache Lucene
- gRPC
- WebSocket
- Maven

### Frontend
- React
- Vite
- ECharts
- Lucide React
- CSS

---
## 📁 Project Structure
```text
logstream-distributed-log-analytics/
│
├── backend/
│   ├── src/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---
## 👩‍💻 My Contribution

My primary contribution was the frontend development and frontend-backend integration.

I worked on:

- Dashboard UI and analytics charts
- Search Logs interface
- Alerts interface
- Live Tail interface
- ECharts integration
- Analytics API integration
- WebSocket Live Tail integration
- Service and log-level filtering
- Pause / Resume functionality
- UI styling, loading states, and final cleanup

## 🔍 Where to Find My Work
Main frontend directory:

```text
frontend/src/
```

Important files:
```text

frontend/src/components/dashboard/LogAnalytics.jsx
frontend/src/components/layout/Sidebar.jsx
frontend/src/pages/Alerts.jsx
frontend/src/pages/LiveTail.jsx
frontend/src/pages/LiveTail.css
frontend/src/services/analyticsService.js
frontend/src/App.jsx
frontend/src/App.css
```

You can also view my final frontend work on the:

```text frontend-ui-refinement ``` branch.

---
## ▶️ Run Locally
# Backend
```text
cd backend
./mvnw spring-boot:run
```
# Backend:
```
HTTP → http://localhost:8080
gRPC → localhost:9090
```
# Frontend
Open another terminal:
```text
cd frontend
npm install
npm run dev
```

Then open the Vite URL shown in the terminal, usually:
```text
http://localhost:5173
```
----
## 📡 Main APIs
```text
GET    /api/analytics/levels
GET    /api/analytics/services
GET    /api/analytics/volume?minutes=30

GET    /api/alerts
POST   /api/alerts
PUT    /api/alerts/{id}
DELETE /api/alerts/{id}

WebSocket:
ws://localhost:8080/ws/livetail
```

---
## 🧪 Verified
 - gRPC log ingestion
 - Lucene indexing & search
 - Analytics dashboard
 - Time-based log aggregation
 - Alert creation & evaluation
 - Alert triggering
 - Simulated webhook
 - WebSocket Live Tail
 - Service & level filtering
 - Frontend linting
 - Backend compilation

 ---
## 📌 Project Status

Completed — Academic Project

LogStream demonstrates a complete flow from:
```text
Log Ingestion → Lucene → Search / Analytics / Alerts → React Dashboard
                                      │
                                      └── WebSocket → Live Tail
```
----
🔗 Repository
```text
https://github.com/Nikkiraj4/logstream-distributed-log-analytics
```



