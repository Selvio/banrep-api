import { useState } from "react";

import { FlowId } from "@/lib/banrep/flows";
import { ApiResponse } from "@/types/api";

interface UseBanrepApiReturn {
  isLoading: boolean;
  error: string | null;
  response: ApiResponse | null;
  executeApi: (flowId: FlowId, startPeriod: string) => Promise<void>;
  resetState: () => void;
}

export function useBanrepApi(): UseBanrepApiReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const executeApi = async (flowId: FlowId, startPeriod: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(
        `/api/banrep/${flowId}?startPeriod=${startPeriod}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "An error occurred");
      } else {
        setResponse({ data });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setIsLoading(false);
    setError(null);
    setResponse(null);
  };

  return {
    isLoading,
    error,
    response,
    executeApi,
    resetState,
  };
} 