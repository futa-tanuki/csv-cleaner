export default function Header() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-900 text-neutral-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-baseline gap-2">
        <h1 className="text-lg font-semibold">CSV整形くん</h1>
        <span className="text-xs text-neutral-400">by FutaTanuki</span>
      </div>
      <div className="text-xs text-neutral-500">
        React + TypeScript + Tailwind
      </div>
    </header>
  );
}
