import { getCookie } from "cookies-next";

const token = getCookie("token");

export default function getAuthHeaders() {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

