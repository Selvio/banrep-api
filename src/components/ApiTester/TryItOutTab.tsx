import { isColcapFlow } from "@/utils/validators";

import { START_PERIOD_OPTIONS } from "./constants";
import { useApiContext } from "./context/ApiContext";

export function TryItOutTab() {
  const {
    selectedFlow,
    startPeriod,
    setStartPeriod,
    isLoading,
    executeApi,
    setCurrentPage,
    setActiveTab,
  } = useApiContext();

  const handleTestApi = async () => {
    setCurrentPage(1);
    setActiveTab("response");
    await executeApi(selectedFlow, startPeriod);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Parameters
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              startPeriod
            </label>
            <select
              value={startPeriod}
              onChange={(e) => setStartPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {START_PERIOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Start year for historical data
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Request URL
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
          <code className="text-sm text-gray-900 dark:text-white">
            GET /api/banrep/{selectedFlow}?startPeriod={startPeriod}
          </code>
        </div>
      </div>

      <button
        onClick={handleTestApi}
        disabled={isLoading || isColcapFlow(selectedFlow)}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Executing...</span>
          </>
        ) : (
          <span>Execute</span>
        )}
      </button>
    </div>
  );
}
