import { TOKEN } from "./constant";

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN);
  }
  return null;
}
