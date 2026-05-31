// Stub — design mode is a platform-only feature, not needed in standalone builds
export type GetStyleInfo = () => Record<string, unknown>;
export function initDesignMode(_getStyleInfo: GetStyleInfo): void {}
