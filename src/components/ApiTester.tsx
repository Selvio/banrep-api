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
  // Indicador Bancario de Referencia (IBR)
  DF_IBR_DAILY_LATEST:
    "🏦 Latest daily Banking Reference Indicator (IBR) - Solo dato actual",
  DF_IBR_DAILY_HIST:
    "📈 Historical daily Banking Reference Indicator (IBR) - Datos históricos",

  // Certificados de depósito a término CDT a 90 días (DTF)
  DF_DTF_DAILY_LATEST:
    "💳 Latest daily CDT 90-day rate (DTF) - Solo dato actual",
  DF_DTF_DAILY_HIST:
    "📈 Historical daily CDT 90-day rate (DTF) - Datos históricos",
  DF_DTF_MONTHLY_LATEST:
    "📊 Latest monthly CDT 90-day rate (DTF) - Solo dato actual",
  DF_DTF_MONTHLY_HIST:
    "📈 Historical monthly CDT 90-day rate (DTF) - Datos históricos",
  DF_DTF_TRIM_ANTICIPADO_LATEST:
    "📅 Latest quarterly anticipated DTF - Solo dato actual",
  DF_DTF_TRIM_ANTICIPADO_HIST:
    "📈 Historical quarterly anticipated DTF - Datos históricos",

  // Tasa de cambio Representativa del Mercado (TRM)
  DF_TRM_DAILY_LATEST: "💱 Latest daily exchange rate (TRM) - Solo dato actual",
  DF_TRM_DAILY_HIST:
    "📈 Historical daily exchange rate (TRM) - Datos históricos",

  // Tasa de interés de Política Monetaria (TPM)
  DF_CBR_DAILY_LATEST:
    "🏦 Latest daily monetary policy rate (TPM) - Solo dato actual",
  DF_CBR_DAILY_HIST:
    "📊 Historical daily monetary policy rate (TPM) - Datos históricos",
  DF_CBR_MONTHLY_LATEST:
    "📊 Latest monthly monetary policy rate (TPM) - Solo dato actual",
  DF_CBR_MONTHLY_HIST:
    "📈 Historical monthly monetary policy rate (TPM) - Datos históricos",

  // Tasa Interbancaria (TIB)
  DF_IR_DAILY_LATEST: "🏛️ Latest daily interbank rate (TIB) - Solo dato actual",
  DF_IR_DAILY_HIST:
    "📈 Historical daily interbank rate (TIB) - Datos históricos",

  // Índice de mercado bursátil (COLCAP)
  DF_COLCAP_MONTHLY_LATEST:
    "⚠️ Latest monthly COLCAP stock index - Currently unavailable",
  DF_COLCAP_MONTHLY_HIST:
    "⚠️ Historical monthly COLCAP stock index - Currently unavailable",

  // Agregados monetarios
  DF_MONAGG_MONTHLY_LATEST:
    "💰 Latest monthly monetary aggregates (M1, M2, M3) - Solo dato actual",
  DF_MONAGG_MONTHLY_HIST:
    "📊 Historical monthly monetary aggregates (M1, M2, M3) - Datos históricos",

  // Unidad de Valor Real (UVR)
  DF_UVR_DAILY_LATEST:
    "📊 Latest daily Real Value Unit (UVR) - Solo dato actual",
  DF_UVR_DAILY_HIST:
    "📈 Historical daily Real Value Unit (UVR) - Datos históricos",
};

export default function ApiTester() {
  const [selectedFlow, setSelectedFlow] = useState<FlowId>("DF_TRM_DAILY_HIST");
  const [startPeriod, setStartPeriod] = useState("2010");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleTestApi = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setCurrentPage(1);

    try {
      const res = await fetch(
        `/api/banrep/${selectedFlow}?startPeriod=${startPeriod}`
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

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    // Handle monthly dates (YYYY-MM) vs daily dates (YYYY-MM-DD)
    if (dateString.match(/^\d{4}-\d{2}$/)) {
      // Monthly format: YYYY-MM
      const parts = dateString.split("-");
      const year = parts[0];
      const month = parts[1];
      if (year && month) {
        const date = new Date(parseInt(year), parseInt(month) - 1, 1);
        return date.toLocaleDateString("es-CO", {
          year: "numeric",
          month: "long",
        });
      }
    }

    // Daily format: YYYY-MM-DD
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Pagination logic
  const totalPages = response?.data
    ? Math.ceil(response.data.length / itemsPerPage)
    : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = response?.data
    ? response.data.slice(startIndex, endIndex)
    : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 max-w-2xl mx-auto">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-yellow-400 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> COLCAP data is currently unavailable due to
              server issues at BANREP. Other data sources are working normally.
            </span>
          </div>
        </div>
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

        <div className="space-y-2">
          <label
            htmlFor="period-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Start Period
          </label>
          <select
            id="period-select"
            value={startPeriod}
            onChange={(e) => setStartPeriod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="1990">Desde 1990</option>
            <option value="2000">Desde 2000</option>
            <option value="2010">Desde 2010</option>
            <option value="2015">Desde 2015</option>
            <option value="2020">Desde 2020</option>
            <option value="2023">Desde 2023</option>
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
                {currentData.map((observation, index) => (
                  <tr
                    key={startIndex + index}
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, response.data.length)} of{" "}
                    {response.data.length} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
