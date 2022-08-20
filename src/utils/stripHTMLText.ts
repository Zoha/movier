export function stripHTMLText(htmlText = "") {
  return htmlText.replace(/(<([^>]+)>)/gi, "");
}
