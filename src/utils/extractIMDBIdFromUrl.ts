export function extractIMDBIdFromUrl(
  fullUrl: string,
  idPrefix: string
): string {
  const matchRegexp = new RegExp(`^${idPrefix}\\d+`);
  return (
    fullUrl
      .replace(/\/$/, "")
      .split("/")
      .filter((i) => matchRegexp.test(i))
      .slice(-1)[0] || ""
  );
}
