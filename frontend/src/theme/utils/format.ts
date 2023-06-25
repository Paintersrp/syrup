export function formatValue(value: any): string | undefined {
  if (value) {
    return typeof value === 'string' && (value.endsWith('px') || value.endsWith('rem'))
      ? value
      : `${value}px`;
  }
  return undefined;
}

export function makeCamelCase(string: string) {
  const parts = string.split('-');
  const formattedParts = parts.map((part, index) => {
    if (index === 0) {
      return part;
    }
    return part.charAt(0).toUpperCase() + part.slice(1);
  });
  console.log(formattedParts.join(''));
  return formattedParts.join('');
}
