export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startInternalMonitoring } = await import('./otel');
    startInternalMonitoring();
  }
}
