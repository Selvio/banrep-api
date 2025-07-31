"use client";

import { useState } from "react";

import { ALLOWED_FLOWS, FlowId } from "@/lib/banrep/flows";

interface Observation {
  date: string;
  value: number;
}

interface ApiResponse {
  data?: Observation[];
  error?: string;
}

const FLOW_DESCRIPTIONS: Record<FlowId, string> = {
  DF_TRM_DAILY_LATEST: "Latest daily exchange rate (TRM)",
  DF_TRM_DAILY_HIST: "Historical daily exchange rate data",
  DF_CBR_DAILY_LATEST: "Latest daily interest rate (CBR)",
  DF_CBR_DAILY_HIST: "Historical daily interest rate data",
  DF_IR_DAILY_LATEST: "Latest daily interest rate",
  DF_IR_DAILY_HIST: "Historical daily interest rate data",
  DF_COLCAP_MONTHLY_LATEST: "Latest monthly COLCAP index",
  DF_COLCAP_MONTHLY_HIST: "Historical monthly COLCAP data",
  DF_MONAGG_MONTHLY_LATEST: "Latest monthly monetary aggregates",
  DF_MONAGG_MONTHLY_HIST: "Historical monthly monetary aggregates",
  DF_UVR_DAILY_LATEST: "Latest daily UVR (Unit of Real Value)",
  DF_UVR_DAILY_HIST: "Historical daily UVR data",
};

export default function ApiTester() {
  const [selectedFlow, setSelectedFlow] = useState<FlowId>(ALLOWED_FLOWS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTestApi = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`/api/banrep/${selectedFlow}`);
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

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          BANREP API Tester
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Test the BANREP financial data API endpoints
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="flow-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Select Flow
          </label>
          <select
            id="flow-select"
            value={selectedFlow}
            onChange={(e) => setSelectedFlow(e.target.value as FlowId)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {ALLOWED_FLOWS.map((flow) => (
              <option key={flow} value={flow}>
                {flow} - {FLOW_DESCRIPTIONS[flow]}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleTestApi}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Testing API...</span>
            </>
          ) : (
            <span>Test API</span>
          )}
        </button>
      </div>

      {/* Results */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}

      {response?.data && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Results for {selectedFlow}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {response.data.length} observations found
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {response.data.slice(0, 10).map((observation, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatDate(observation.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                      {formatValue(observation.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {response.data.length > 10 && (
              <div className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                Showing first 10 of {response.data.length} results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
