
import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const suggestions = [
  "Whey Protein",
  "Kreatinë",
  "Mass Gainer",
  "BCAA",
  "Lifting Straps",
];

export default function SearchOverlay({ open, onClose }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const handleSearch = (term) => {
    const query = term.trim();

    if (!query) return;

    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setValue("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(value);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="border-b border-orange-500/20 bg-[#101010] text-white shadow-2xl">
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-10 md:py-12">

          {/* HEADER */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold tracking-[0.3em] text-orange-500">
                PROTEIN FITNESS
              </p>

              <h2 className="mt-3 text-2xl font-black uppercase tracking-tight md:text-4xl">
                KËRKO PRODUKTE
              </h2>

              <p className="mt-2 text-sm text-neutral-400">
                Gjej proteinat, kreatinën dhe aksesorët që të duhen.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Mbyll kërkimin"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 transition hover:border-orange-500 hover:text-orange-500"
            >
              <X size={23} />
            </button>
          </div>

          {/* SEARCH INPUT */}
          <form
            onSubmit={handleSubmit}
            role="search"
            className="mt-8 flex items-center border-b-2 border-orange-500"
          >
            <Search
              size={25}
              className="shrink-0 text-orange-500"
            />

            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Kërko produkte..."
              aria-label="Kërko produkte"
              className="min-w-0 flex-1 bg-transparent px-4 py-5 text-lg text-white outline-none placeholder:text-neutral-500 md:text-3xl"
            />

            <button
              type="submit"
              disabled={!value.trim()}
              className="shrink-0 rounded bg-orange-500 px-4 py-3 text-xs font-black uppercase text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40 md:px-7 md:text-sm"
            >
              KËRKO
            </button>
          </form>

          {/* SUGGESTIONS */}
          <div className="mt-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
              Kërkimet e sugjeruara
            </p>

            <div className="flex flex-wrap gap-3">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSearch(item)}
                  className="group flex items-center gap-2 rounded border border-white/15 px-4 py-3 text-sm font-medium text-neutral-300 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-white"
                >
                  {item}

                  <ArrowUpRight
                    size={15}
                    className="text-orange-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-10 border-t border-white/10 pt-5">
            <p className="text-xs font-semibold tracking-widest text-neutral-500">
              PROTEIN FITNESS — SPORTS SUPPLEMENTS
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
