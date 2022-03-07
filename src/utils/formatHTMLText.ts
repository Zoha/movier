export function formatHTMLText(originalText?: string) {
  if (!originalText) {
    return "";
  }
  return originalText.trim().replace(/\n/g, "").toLowerCase();
}
