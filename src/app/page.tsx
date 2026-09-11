export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">BatchBoard</h1>
          <p className="text-gray-400 text-lg">
            Agent ops board for AI-first teams
          </p>
        </div>

        <p className="text-gray-500 text-sm">
          Monitor and manage your Claude Batch API jobs, AI agent pipelines, and
          LLM workloads — all from one place.
        </p>

        <div className="pt-4">
          <span className="inline-block bg-indigo-900/50 text-indigo-300 text-xs font-medium px-3 py-1 rounded-full border border-indigo-800">
            Coming soon — building in public
          </span>
        </div>
      </div>
    </main>
  );
}
