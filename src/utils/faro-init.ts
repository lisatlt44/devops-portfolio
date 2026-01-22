import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';

export function initFaro() {
  if (typeof globalThis.window !== 'undefined' && process.env.NEXT_PUBLIC_FARO_URL && process.env.NEXT_PUBLIC_FARO_APP_ID) {
    initializeFaro({
      url: process.env.NEXT_PUBLIC_FARO_URL,
      app: {
        name: 'portfolio',
        version: '1.0.0',
        environment: 'production'
      },
      instrumentations: [
        // Load all default web instrumentations
        ...getWebInstrumentations(),
      ],
    });
  }
}