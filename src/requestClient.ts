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
      "Accept-language": "en-US,en",
      Cookie:
        "session-id=143-9737041-2029012; session-id-time=2298403685; session-token=j4EejTFisPL9vXbxJKIimGbuAk+eqCEgUi7Bua5GYy9u0Zid6InLR6c6L4fw+8/JBJlxpZPgfHDJJnzugb3DAs7m6x7DnUca7gP3dGgidMx8LdhF8GK4wlEaDe6SbitGlLv8Gk8hFjdM9BOFQ+auwq5nNfk6yaA2aK3mugUiR2Lc0mTm3hwzCZbLAgxjd5zBXc+B4h3CG0+lZJ3l1jLdjcXsPiCmRD6+Up48G9bLtB4=; ubid-main=130-5229443-8579023; uu=eyJpZCI6InV1YTBjZTRkZTMyZWExNDQ1N2IyMzYiLCJwcmVmZXJlbmNlcyI6eyJmaW5kX2luY2x1ZGVfYWR1bHQiOmZhbHNlfX0=",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
    params,
  });
}
