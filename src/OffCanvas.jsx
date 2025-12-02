import React, { useEffect } from "react";

export default function OffCanvas({
  open = true,
  onClose,
  data,
  width = "w-[28rem]",
  side = "right",
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!data) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        style={{
          background: "rgba(0,0,0,0.32)",
          backdropFilter: open ? "blur(6px)" : "none",
          WebkitBackdropFilter: open ? "blur(6px)" : "none",
          transition: "opacity 250ms ease, backdrop-filter 250ms ease",
        }}
        aria-hidden={!open}
      />

      <aside
        className={`
          fixed top-0 
          ${side === "right" ? "right-0" : "left-0"}
          h-full z-50 transform transition-transform duration-300
          w-full max-w-full           /* mobile: full width */
          md:${width}                 /* desktop: use provided width */
          bg-black text-white
          shadow-2xl flex flex-col
          ${
            open
              ? "translate-x-0"
              : side === "right"
              ? "translate-x-full"
              : "-translate-x-full"
          }
        `}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2 truncate">
            {data?.img && (
              <img
                src={data.img}
                alt={data.company}
                className="w-7 h-7 rounded object-cover"
              />
            )}
            <span className="truncate">{data?.company}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-xl leading-none hover:scale-110 transition-transform"
          >
            ✖
          </button>
        </div>

        <div className="p-4 overflow-auto flex flex-col gap-4 flex-1">
          <div className="space-y-1">
            <h4 className="text-sm md:text-md font-semibold">
              Role: <span className="font-normal">{data.title}</span>
            </h4>
            <h4 className="text-sm md:text-md font-semibold">
              Timeline: <span className="font-normal">{data.timeline}</span>
            </h4>
          </div>

          {Array.isArray(data.skills) && data.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span
                  key={s}
                  className="text-[11px] px-3 py-1 rounded-full border border-gray-600 bg-gray-800 text-gray-100"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="whitespace-pre-line flex flex-col gap-4 flex-1">
            {Array.isArray(data.contributions) &&
              data.contributions.map((c) => (
                <article
                  key={c.id}
                  className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-white">
                        {c.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Key contributions
                      </p>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-2 text-xs md:text-sm text-gray-200">
                    {Array.isArray(c.details) &&
                      c.details.map((d, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="min-w-[6px] mt-1 h-1.5 rounded-full bg-white/80" />
                          <span>{d}</span>
                        </li>
                      ))}
                  </ul>
                </article>
              ))}
          </div>
        </div>
      </aside>
    </>
  );
}
