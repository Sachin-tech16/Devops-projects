# Complete Observability System (Metrics, Logs & Traces) – Docker Compose

This project demonstrates a complete end-to-end observability system for a containerized sample web application using real DevOps/SRE tools.

It includes:

✅ Metrics Monitoring (Prometheus)  
✅ Dashboards & Visualization (Grafana)  
✅ Centralized Logging (Loki + Promtail)  
✅ Distributed Tracing (Jaeger)  
✅ All services managed using Docker Compose  

---

## 🚀 Tech Stack

- **Docker & Docker Compose**
- **Prometheus** (Metrics)
- **Grafana** (Visualization)
- **Loki** (Log aggregation)
- **Promtail** (Log shipper)
- **Jaeger** (Tracing)
- **Node.js Sample App** (instrumented for metrics + logs + traces)

---

## 📌 Project Architecture (High Level)

- The sample app exposes metrics at: `/metrics`
- Prometheus scrapes the app metrics
- Promtail collects Docker container logs and sends them to Loki
- Jaeger stores and visualizes tracing data
- Grafana acts as the single dashboard for metrics and logs

---

## 📂 Folder Structure

observability-project/
├── app/
│ ├── Dockerfile
│ ├── package.json
│ └── server.js
├── prometheus/
│ └── prometheus.yml
├── promtail/
│ └── promtail-config.yml
└── docker-compose.yml

yaml
Copy code

---

## ⚙️ How to Run the Project

### 1️⃣ Start all services
```bash
docker compose up --build
2️⃣ Access the Services
Tool	URL
Sample App	http://localhost:3000
Prometheus	http://localhost:9090
Grafana	http://localhost:3001
Jaeger	http://localhost:16686
Loki	http://localhost:3100

🔑 Grafana Login
Default credentials:

Username: admin

Password: admin

✅ Verification Steps
🔥 1) Prometheus Target Health
Open:

http://localhost:9090/targets

You should see:

✅ sample-app target UP

📊 2) Grafana Dashboard (Metrics)
In Grafana:

Add Prometheus data source:

arduino
Copy code
http://prometheus:9090
Create a dashboard panel using:

nginx
Copy code
http_requests_total
📝 3) Grafana Explore (Logs)
In Grafana → Explore → Loki datasource:

Query:

logql
Copy code
{job="sample-app-logs"}
You will see logs coming from the app container.

🧵 4) Jaeger Traces
Open:

http://localhost:16686

Select:

Service: sample-app

Click Find Traces

Open any trace to view spans and timeline

📸 Screenshots / Demo Proof (Recommended)
For project submission / portfolio, take screenshots of:

docker compose running in terminal

Prometheus Targets showing app = UP

Grafana Prometheus datasource working

Grafana Loki datasource working

Grafana dashboard showing metrics graph

Grafana Explore showing Loki logs

Jaeger trace timeline

⭐ Outcome
A complete observability environment was successfully created locally using Docker Compose.
This project demonstrates real-world DevOps/SRE skills in:

Monitoring & metrics collection

Dashboard building

Log aggregation

Distributed tracing

Multi-container orchestration

🚀 Future Enhancements
Add Prometheus alert rules

Configure Grafana alerts

Add Node Exporter / cAdvisor

Add persistent volumes for Prometheus and Loki

Deploy the same setup on AWS or Kubernetes

👤 Author
Sachin
DevOps / Cloud Enthusiast

