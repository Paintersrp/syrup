export function formatValue(value: any): string | undefined {
  if (value) {
    return typeof value === 'string' && (value.endsWith('px') || value.endsWith('rem'))
      ? value
      : `${value}px`;
  }
  return undefined;
}
