import { useState } from "react";
import Header from "./components/Header";
import OptionsPanel from "./components/OptionsPanel";
import TextAreaBlock from "./components/TextAreaBlock";
import { useCsvCleaner } from "./hooks/useCsvCleaner";
import type { CleanerOptions } from "./types";

export default function App() {
  const [rawText, setRawText] = useState<string>("name,price\nりんご,100\nみかん,200\nりんご,100\n\n");
  const [options, setOptions] = useState<CleanerOptions>({
    trimWhitespace: true,
    removeEmptyLines: true,
    dedupeLines: true,
  });

  const { cleanedText, stats } = useCsvCleaner(rawText, options);

  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanedText);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  return (
    <div className="bg-neutral-100 min-h-screen flex flex-col text-neutral-900">
      <Header />

      <main className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl w-full mx-auto">
        {/* 左右のテキストエリア */}
        <section className="flex-1 flex flex-col gap-4">
          <TextAreaBlock
            label="元データ（CSVやリストを貼り付け）"
            value={rawText}
            onChange={setRawText}
            placeholder={`例）\nname,price\nりんご,100\nみかん,200\nりんご,100\n`}
          />

          <TextAreaBlock
            label="整形後プレビュー"
            value={cleanedText}
            readOnly
          />
        </section>

        {/* 右パネル */}
        <OptionsPanel
          options={options}
          onChange={setOptions}
          stats={stats}
          onCopy={handleCopy}
          copyState={copyState}
        />
      </main>

      <footer className="text-[10px] text-neutral-500 text-center py-6">
        © {new Date().getFullYear()} futa_tanuki
      </footer>
    </div>
  );
}
