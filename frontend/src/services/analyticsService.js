import { apiRequest } from "./api";

export async function getLogLevelAnalytics() {
  return apiRequest("/api/analytics/levels");
}

export async function getServiceAnalytics() {
  return apiRequest("/api/analytics/services");
}

export async function getLogVolumeAnalytics(minutes = 30) {
  return apiRequest(
    `/api/analytics/volume?minutes=${minutes}`
  );
}