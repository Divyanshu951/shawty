export type INITIAL_QUICK_URL_STATE = {
  status: "failed" | "success" | "pending";
  message: string;
  error: string;
  url?: string;
};

export const INITIAL_QUICK_URL_STATE: INITIAL_QUICK_URL_STATE = {
  status: "failed",
  message: "",
  error: "",
  url: "",
};
