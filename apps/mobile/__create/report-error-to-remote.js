// Remote error reporting removed (was Anything-platform telemetry that
// posted logs to their servers). Kept as no-ops so existing imports work.
export const sendLogsToRemote = async () => ({ success: false });
export const reportErrorToRemote = async () => ({ success: false });
