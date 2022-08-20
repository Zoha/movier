export function formatHTMLText(
  originalText?: string,
  { toLowerCase = false } = {}
) {
  if (!originalText) {
    return "";
  }
  let finalResult = originalText.trim().replace(/\n/g, "");
  if (toLowerCase) {
    finalResult = finalResult.toLocaleLowerCase();
  }
  return finalResult;
}
