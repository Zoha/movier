export function getIMDBFullSizeImageFromThumbnailUrl(
  thumbnailUrl?: string
): string {
  if (!thumbnailUrl || typeof thumbnailUrl !== "string") {
    return "";
  }
  if (/@.+/i.test(thumbnailUrl)) {
    return thumbnailUrl.split("@").slice(0, -1).join("@") + "@.jpg";
  } else if (/\._V1.+/i.test(thumbnailUrl)) {
    return thumbnailUrl.split("._V1").slice(0, -1).join("") + ".jpg";
  }
  return "";
}
