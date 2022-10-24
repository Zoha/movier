import axios from "axios";

interface getRequestResponse {
  data: string;
  status: number;
}
export function getRequest(
  url: string,
  params?: { [key: string]: number | boolean | string }
): Promise<getRequestResponse> {
  return axios.get(url, {
    headers: {
      "accept-language": "en-US,en",
    },
    params,
  });
}
