import { $api } from "@shared/api";

const useGetDashboardData = () => {
  return $api.useQuery("get", "/api/dashboard");
};

export const $dashboardHooks = {
  getData: useGetDashboardData,
};
