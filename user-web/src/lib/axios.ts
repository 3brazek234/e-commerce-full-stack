// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",          // مهم: يمر على Rewrite
  withCredentials: false,   // فعلها بس لو فعلاً محتاج كوكيز/سيشن
});
