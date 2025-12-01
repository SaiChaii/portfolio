import React, { useEffect } from "react";

export default function OffCanvas({
  open = true,
  onClose,
  data,
  width = "w-156",
  side = "right",
}) {
  // disable body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // overlay (blur) + slide panel
  return (
    <>
      {/* Overlay that blurs page behind and closes on click */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        style={{
          background: "rgba(0,0,0,0.32)",
          // CSS backdrop filter to blur content behind the overlay
          backdropFilter: open ? "blur(6px)" : "none",
          WebkitBackdropFilter: open ? "blur(6px)" : "none",
          transition: "opacity 250ms ease, backdrop-filter 250ms ease",
        }}
        aria-hidden={!open}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 bg-black text-white ${
          side === "right" ? "right-0" : "left-0"
        } h-full z-50 transform transition-transform duration-300 ${width}
        shadow-2xl flex flex-col ${
          open
            ? "translate-x-0"
            : side === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <img
              src={data?.img}
              alt={data?.company}
              className="w-6 h-6 rounded object-cover"
            />
            {data?.company}
          </h3>
          <button onClick={onClose} className="text-xl leading-none">
            ✖
          </button>
        </div>

        <div className="p-4 overflow-auto flex flex-col gap-4 flex-1">
          <h4 className="text-md font-semibold mb-2">Role: {data.title}</h4>
          <h4 className="text-md font-semibold mb-2">
            Timeline: {data.timeline}
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded-full border border-gray-600 bg-gray-800 text-gray-100"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="whitespace-pre-line flex flex-col gap-4 flex-1">
            {data.contributions.map((c) => {
              const isOpen = true;
              return (
                <article
                  key={c.id}
                  className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {c.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Key contributions
                      </p>
                    </div>

                    {/* <button
                      aria-expanded={isOpen}
                      className="ml-auto text-sm px-3 py-1 rounded border border-gray-600 bg-transparent text-white hover:bg-white/5"
                    >
                      {isOpen ? "Hide" : "Show"}
                    </button> */}
                  </div>

                  {/* Details */}
                  <ul
                    className={`mt-3 space-y-2 text-sm text-gray-200 transition-max-h duration-300 overflow-hidden ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                    aria-hidden={!isOpen}
                  >
                    {c.details.map((d, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="min-w-[6px] mt-1 h-1.5 rounded-full bg-white/80" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
