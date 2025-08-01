"use client";

import { useState } from "react";

import { useApiState } from "@/hooks/useApiState";
import { FlowId } from "@/lib/banrep/flows";
import { TabType } from "@/types/api";

import { ApiTester } from "./ApiTester";
import { ApiContext } from "./context/ApiContext";

export default function ApiTesterContainer() {
  const [selectedFlow, setSelectedFlow] = useState<FlowId>(
    "DF_TRM_DAILY_LATEST"
  );
  const [startPeriod, setStartPeriod] = useState("2010");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>("try-it-out");

  const apiState = useApiState();

  const contextValue = {
    selectedFlow,
    setSelectedFlow,
    startPeriod,
    setStartPeriod,
    currentPage,
    setCurrentPage,
    activeTab,
    setActiveTab,
    ...apiState,
  };

  return (
    <ApiContext.Provider value={contextValue}>
      <ApiTester />
    </ApiContext.Provider>
  );
}
