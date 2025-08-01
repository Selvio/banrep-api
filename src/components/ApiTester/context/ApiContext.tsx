import { createContext, useContext } from "react";

import { FlowId } from "@/lib/banrep/flows";
import { ApiResponse, TabType } from "@/types/api";

interface ApiContextType {
  selectedFlow: FlowId;
  setSelectedFlow: (flow: FlowId) => void;
  startPeriod: string;
  setStartPeriod: (period: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  // API State
  isLoading: boolean;
  error: string | null;
  response: ApiResponse | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setResponse: (response: ApiResponse | null) => void;
  resetState: () => void;
  executeApi: (flowId: FlowId, startPeriod: string) => Promise<void>;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApiContext must be used within an ApiContextProvider");
  }
  return context;
}; 