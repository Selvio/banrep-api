import { useApiContext } from "./context/ApiContext";

export function TabNavigation() {
  const { activeTab, setActiveTab } = useApiContext();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex space-x-8 px-6">
        <button
          onClick={() => setActiveTab("try-it-out")}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "try-it-out"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Try it out
        </button>
        <button
          onClick={() => setActiveTab("response")}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "response"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Response
        </button>
      </nav>
    </div>
  );
} 