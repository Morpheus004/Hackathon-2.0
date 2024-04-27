import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem("token");
    if (!token || token === "") {
      return null; // Return null if token is falsy or an empty string
    }
    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
      return "EXPIRED"; // Return "EXPIRED" if token duration is negative
    }
    return token; // Return the token string
  }

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
    const token = getAuthToken();
    if (!token || token === "EXPIRED" || token === "") {
      return redirect("/login");
    }
    return null;
  }