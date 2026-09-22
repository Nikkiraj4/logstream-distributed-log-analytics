# LogStream – Distributed Log Analytics

LogStream is a distributed log analytics platform designed to **collect, search, analyze, and monitor application logs** from multiple services through a centralized dashboard.

The project provides a user-friendly interface for developers and system teams to understand application activity, identify errors, search logs, and configure alert conditions.

---

## 🚀 Features

### 📊 Dashboard

* Centralized overview of application logs
* Log statistics and monitoring information
* Analytics section for understanding log distribution
* Visual representation of log data

### 🔍 Log Search

* Search application logs from a centralized interface
* Filter logs by:

  * Log level
  * Service
  * Search query
* Display matching logs in a structured table

### 📈 Log Analytics

* Analyze logs by log level
* Analyze logs by service
* View log volume over time
* Interactive charts using ECharts

### 🚨 Alert Management

* Create alert configurations
* Configure:

  * Alert name
  * Service
  * Log level
  * Condition
  * Threshold
  * Severity
* View existing alerts
* Delete alerts
* Backend scheduler evaluates configured alert conditions

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    │      Browser         │
                    └──────────┬───────────┘
                               │
                               │ HTTP Requests
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │      Vite            │
                    │                      │
                    │ Dashboard            │
                    │ Search Logs          │
                    │ Analytics            │
                    │ Alerts               │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot       │
                    │      Backend         │
                    │                      │
                    │ Controllers          │
                    │ Services             │
                    │ Alert Engine         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Apache Lucene     │
                    │  Log Indexing/Search  │
                    └──────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* ECharts
* ECharts for React
* CSS

### Backend

* Java
* Spring Boot
* Apache Lucene
* REST APIs
* gRPC

### Development Tools

* Git
* GitHub
* Maven
* npm

---

## 📁 Project Structure

```text
logstream-distributed-log-analytics/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/
│   │               └── logstream/
│   │
│   └── pom.xml
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Java
* Maven
* Git

---

## 🔧 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

The backend will start on the configured Spring Boot port.

---

## 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔗 API Overview

The application exposes APIs for different parts of the platform.

### Analytics

```text
GET /api/analytics/levels
GET /api/analytics/services
GET /api/analytics/volume
```

### Alerts

The alert APIs support operations such as:

```text
GET    /api/alerts
POST   /api/alerts
DELETE /api/alerts/{id}
```

### Search

The search API allows the frontend to request logs based on search criteria and filters.

---

## 🔄 Application Flow

The basic workflow of LogStream is:

```text
Log Data
   ↓
Backend Processing
   ↓
Lucene Indexing
   ↓
Search / Analytics / Alert Evaluation
   ↓
REST APIs
   ↓
React Frontend
   ↓
Dashboard / Search / Analytics / Alerts
```

---

## 📊 Analytics

LogStream uses **ECharts** to visualize analytics information received from the backend.

Currently, analytics includes:

* Logs by Level
* Logs by Service
* Log Volume over Time

The frontend requests analytics data through REST APIs and converts the response into interactive visualizations.

---

## 🚨 Alert System

The alert system allows users to define conditions for monitoring logs.

For example:

```text
Service: billing-api
Level: ERROR
Condition: Greater Than
Threshold: 10
Severity: HIGH
```

The backend scheduler periodically evaluates configured alert rules against the indexed logs.

---

## 🧪 Testing & Verification

The project has been verified through:

### Backend

```bash
./mvnw clean compile
```

### Frontend

```bash
npm run lint
```

```bash
npm run build
```

The frontend production build and backend compilation complete successfully.

---

## 🔮 Future Improvements

Possible future improvements include:

* Real-time log streaming
* Persistent alert history
* More advanced analytics
* Additional visualization types
* Notification integrations
* Improved alert event management
* Production deployment and monitoring

---

## 👥 Team

**LogStream – Distributed Log Analytics**

A collaborative project involving frontend development, backend development, and system integration.

---

## 📌 Project Status

**Current Status: Functional MVP**

The core platform currently supports centralized log search, dashboard monitoring, analytics, and alert configuration with frontend-backend integration.

Further improvements and advanced features can be added as development continues.
