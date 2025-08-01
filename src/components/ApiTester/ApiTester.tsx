import { ApiDocumentation } from "./ApiDocumentation";
import { useApiContext } from "./context/ApiContext";
import { EndpointHeader } from "./EndpointHeader";
import { FlowSelector } from "./FlowSelector";
import { ResponseTab } from "./ResponseTab";
import { TabNavigation } from "./TabNavigation";
import { TryItOutTab } from "./TryItOutTab";

export function ApiTester() {
  const { activeTab } = useApiContext();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  BANREP API Documentation
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <FlowSelector />
            <ApiDocumentation />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <EndpointHeader />
              <TabNavigation />

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "try-it-out" && <TryItOutTab />}
                {activeTab === "response" && <ResponseTab />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
