import { useState, useCallback } from "react";

import { FlowId } from "@/lib/banrep/flows";
import { ApiResponse, ApiState } from "@/types/api";

interface UseApiStateReturn extends ApiState {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setResponse: (response: ApiResponse | null) => void;
  resetState: () => void;
  executeApi: (flowId: FlowId, startPeriod: string) => Promise<void>;
}

export function useApiState(): UseApiStateReturn {
  const [state, setState] = useState<ApiState>({
    isLoading: false,
    error: null,
    response: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const setResponse = useCallback((response: ApiResponse | null) => {
    setState((prev) => ({ ...prev, response }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      response: null,
    });
  }, []);

  const executeApi = useCallback(
    async (flowId: FlowId, startPeriod: string) => {
      setLoading(true);
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
        setLoading(false);
      }
    },
    [setLoading, setError, setResponse]
  );

  return {
    ...state,
    setLoading,
    setError,
    setResponse,
    resetState,
    executeApi,
  };
} 