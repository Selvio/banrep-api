import { useState } from "react";

import { FlowId } from "@/lib/banrep/flows";
import { isColcapFlow } from "@/utils/validators";

import { FLOW_DESCRIPTIONS, FLOW_CATEGORIES } from "./constants";
import { useApiContext } from "./context/ApiContext";

export function FlowSelector() {
  const { selectedFlow, setSelectedFlow } = useApiContext();
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set()
  );

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-h-[85vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Endpoints
        </h2>
        <div className="space-y-4">
          {Object.entries(FLOW_CATEGORIES).map(([category, flows]) => {
            const isCollapsed = collapsedCategories.has(category);

            return (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span>{category}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCollapsed ? "rotate-0" : "rotate-180"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
                  }`}
                >
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
