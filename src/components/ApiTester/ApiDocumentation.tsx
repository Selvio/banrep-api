export function ApiDocumentation() {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          API Information
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <span className="font-medium">Base URL:</span>
            <div className="font-mono text-xs mt-1 bg-gray-100 dark:bg-gray-700 p-2 rounded">
              /api/banrep/{"{flow}"}
            </div>
          </div>
          <div>
            <span className="font-medium">Method:</span>
            <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs rounded">
              GET
            </span>
          </div>
          <div>
            <span className="font-medium">Parameters:</span>
            <div className="mt-1 space-y-1">
              <div className="text-xs">
                <span className="font-mono">flow</span> - Flow identifier
              </div>
              <div className="text-xs">
                <span className="font-mono">startPeriod</span> - Start year (optional)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 