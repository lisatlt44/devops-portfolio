"use client";

import { useEffect, useRef } from "react";
import { initializeFaro, getWebInstrumentations, FaroInstance } from "@grafana/faro-web-sdk";
import { FaroRoutes } from "@grafana/faro-react";

export default function FaroSetup() {
  const faroRun = useRef(false);

  useEffect(() => {
    if (faroRun.current) return;

    if (process.env.NEXT_PUBLIC_FARO_URI) {
        initializeFaro({
            url: process.env.NEXT_PUBLIC_FARO_URI,
            app: {
                name: process.env.NEXT_PUBLIC_FARO_APP_ID || "portfolio-frontend",
                version: "1.0.0",
                environment: process.env.NODE_ENV,
            },
            instrumentations: [...getWebInstrumentations(), new FaroRoutes()],
        });
        faroRun.current = true;
    }
  }, []);

  return null;
}
