import { FlowId } from "@/lib/banrep/flows";
import { isColcapFlow } from "@/utils/validators";

import { FLOW_DESCRIPTIONS, FLOW_CATEGORIES } from "./constants";
import { useApiContext } from "./context/ApiContext";

export function EndpointHeader() {
  const { selectedFlow } = useApiContext();

  const getFlowCategory = (flow: FlowId) => {
    for (const [category, flows] of Object.entries(FLOW_CATEGORIES)) {
      if (flows.includes(flow)) {
        return category;
      }
    }
    return "Other";
  };

  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {selectedFlow}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {FLOW_DESCRIPTIONS[selectedFlow]}
          </p>
          <div className="flex items-center mt-2 space-x-4">
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs rounded font-medium">
              GET
            </span>
            <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
              /api/banrep/{selectedFlow}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Category: {getFlowCategory(selectedFlow)}
          </div>
          {isColcapFlow(selectedFlow) && (
            <div className="text-xs text-red-600 dark:text-red-400 mt-1">
              ⚠️ Currently unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
