// tests/stress/k6-health.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1000,
  duration: "1m",
  thresholds: {
    http_req_failed: ["rate<0.10"],
    http_req_duration: ["p(95)<1000"]
  }
};

export default function () {
  const res = http.get("http://localhost:3000/health");

  check(res, {
    "status es 200": (r) => r.status === 200,
    "respuesta menor a 1s": (r) => r.timings.duration < 1000
  });

  sleep(1);
}