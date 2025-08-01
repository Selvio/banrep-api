import { ApiResponse } from "@/types/api";

interface ResponseViewerProps {
  response: ApiResponse;
}

export function ResponseViewer({ response }: ResponseViewerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Response
        </h3>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs rounded">
            200 OK
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {response.data?.length || 0} observations
          </span>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-600">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Response Body
          </span>
        </div>
        <div className="p-4">
          <pre className="text-sm text-gray-900 dark:text-white overflow-x-auto max-h-[42vh] overflow-y-auto">
            <code>{JSON.stringify(response.data, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
