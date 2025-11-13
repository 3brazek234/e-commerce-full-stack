import { SWRConfiguration } from "swr";
import { api } from "./axios";

export const swrConfig: SWRConfiguration = {
  fetcher: (url: string) => api.get(url).then((r) => r.data),
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
  dedupingInterval: 60000,
};
