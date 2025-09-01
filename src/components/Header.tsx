interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Header({ searchQuery, setSearchQuery, darkMode, setDarkMode }: Props) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center flex-1">Our's Taskmate</h1>
         <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition-colors"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
    </div>
  );
}
