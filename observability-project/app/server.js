const express = require("express");
const client = require("prom-client");
const pino = require("pino");
const initTracer = require("jaeger-client").initTracer;

const app = express();
const port = 3000;

const logger = pino({
  transport: {
    target: "pino-pretty"
  }
});

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP Requests",
  labelNames: ["route", "method", "status"]
});
register.registerMetric(httpRequestCounter);

// Jaeger tracing
const tracerConfig = {
  serviceName: "sample-app",
  sampler: { type: "const", param: 1 },
  reporter: { logSpans: true, agentHost: "jaeger", agentPort: 6832 }
};

const tracer = initTracer(tracerConfig, { logger });

app.get("/", (req, res) => {
  const span = tracer.startSpan("GET /");
  logger.info("Home page visited");

  httpRequestCounter.inc({ route: "/", method: "GET", status: 200 });
  span.finish();

  res.send("Hello from Observability App 🚀");
});

app.get("/slow", async (req, res) => {
  const span = tracer.startSpan("GET /slow");
  logger.warn("Slow endpoint triggered");

  await new Promise((r) => setTimeout(r, 2000));

  httpRequestCounter.inc({ route: "/slow", method: "GET", status: 200 });
  span.finish();

  res.send("Slow response done 🐢");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  logger.info(`App running on port ${port}`);
});
