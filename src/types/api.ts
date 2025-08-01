export interface Observation {
  date: string;
  value: number;
}

export interface ApiResponse {
  data?: Observation[];
  error?: string;
}

export interface ApiState {
  isLoading: boolean;
  error: string | null;
  response: ApiResponse | null;
}

export type TabType = "try-it-out" | "response"; 