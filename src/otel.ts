import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'portfolio-app',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    headers: process.env.OTEL_EXPORTER_OTLP_HEADERS 
      ? parseHeaders(process.env.OTEL_EXPORTER_OTLP_HEADERS)
      : {},
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

function parseHeaders(headersString: string): Record<string, string> {
    const headers: Record<string, string> = {};
    headersString.split(',').forEach(header => {
        const [key, ...valueParts] = header.split('=');
        const value = valueParts.join('=');
        if (key && value) {
            headers[key.trim()] = value.trim();
        }
    });
    return headers;
}

export function startInternalMonitoring() {
    // Only start if running in Node.js environment and not during build
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        sdk.start();
        console.log('OpenTelemetry started for service:', process.env.OTEL_SERVICE_NAME);
    }
}
