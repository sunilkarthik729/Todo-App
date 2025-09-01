interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: Props) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <h1 className="text-3xl font-bold text-center">My Todo App</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}
