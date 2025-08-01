import { FlowId } from "@/lib/banrep/flows";
import { isColcapFlow } from "@/utils/validators";

import { FLOW_DESCRIPTIONS, FLOW_CATEGORIES } from "./constants";
import { useApiContext } from "./context/ApiContext";

export function FlowSelector() {
  const { selectedFlow, setSelectedFlow } = useApiContext();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Endpoints
        </h2>
        <div className="space-y-4">
          {Object.entries(FLOW_CATEGORIES).map(([category, flows]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {category}
              </h3>
              <div className="space-y-1">
                {flows.map((flow) => (
                  <button
                    key={flow}
                    onClick={() => setSelectedFlow(flow as FlowId)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedFlow === flow
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    } ${isColcapFlow(flow as FlowId) ? "opacity-50" : ""}`}
                    disabled={isColcapFlow(flow as FlowId)}
                  >
                    <div className="font-mono text-xs">{flow}</div>
                    <div className="text-xs mt-1 truncate">
                      {FLOW_DESCRIPTIONS[flow as FlowId]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
