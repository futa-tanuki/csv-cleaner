import type { CleanerOptions } from "../types";

type Props = {
  options: CleanerOptions;
  onChange: (next: CleanerOptions) => void;
  stats: { originalCount: number; finalCount: number; removedCount: number };
  onCopy: () => void;
  copyState: "idle" | "copied";
};

export default function OptionsPanel({
  options,
  onChange,
  stats,
  onCopy,
  copyState,
}: Props) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0 bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex flex-col gap-4 text-neutral-800">
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-neutral-900">
          オプション
        </h2>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1 accent-neutral-800"
            checked={options.trimWhitespace}
            onChange={(e) =>
              onChange({ ...options, trimWhitespace: e.target.checked })
            }
          />
          <span>
            行頭・行末の空白を削除
            <span className="block text-neutral-500 text-xs">
              " ABC ,123 " → "ABC ,123"
            </span>
          </span>
        </label>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1 accent-neutral-800"
            checked={options.removeEmptyLines}
            onChange={(e) =>
              onChange({ ...options, removeEmptyLines: e.target.checked })
            }
          />
          <span>
            空行を削除
            <span className="block text-neutral-500 text-xs">
              余計な空白行を消します
            </span>
          </span>
        </label>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1 accent-neutral-800"
            checked={options.dedupeLines}
            onChange={(e) =>
              onChange({ ...options, dedupeLines: e.target.checked })
            }
          />
          <span>
            重複行を削除
            <span className="block text-neutral-500 text-xs">
              同じ行は1回だけにします
            </span>
          </span>
        </label>
      </section>

      <section className="space-y-1 text-sm">
        <h2 className="text-sm font-semibold text-neutral-900">ステータス</h2>
        <div className="text-xs text-neutral-600 leading-relaxed">
          <div>
            行数:{" "}
            <span className="font-semibold text-neutral-900">
              {stats.originalCount}
            </span>{" "}
            →{" "}
            <span className="font-semibold text-neutral-900">
              {stats.finalCount}
            </span>
          </div>
          <div>
            削除:{" "}
            <span className="font-semibold text-emerald-600">
              -{stats.removedCount}
            </span>{" "}
            行
          </div>
        </div>
      </section>

      <button
        className={`text-sm font-medium rounded-lg border px-3 py-2 text-center
        ${
          copyState === "copied"
            ? "bg-emerald-600 text-white border-emerald-600"
            : "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800"
        }`}
        onClick={onCopy}
      >
        {copyState === "copied" ? "コピーしました" : "整形結果をコピー"}
      </button>

      <p className="text-[10px] text-neutral-400 leading-relaxed">
        ※ 個人情報などの機密データは公開環境で扱わないでください。
      </p>
    </aside>
  );
}
