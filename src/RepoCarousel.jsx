// RepoCarousel.jsx
import React, { useEffect, useState, useMemo } from "react";

function formatTimeAgo(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;

  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if (year > 0) return `${year}y ago`;
  if (month > 0) return `${month}mo ago`;
  if (day > 0) return `${day}d ago`;
  if (hr > 0) return `${hr}h ago`;
  if (min > 0) return `${min}m ago`;
  return "Just now";
}

export default function RepoCarousel({ repos = [] }) {
  const [current, setCurrent] = useState(0);

  // filter only public + non-archived, sorted by updated_at desc
  const visibleRepos = useMemo(() => {
    if (!repos || !Array.isArray(repos)) return [];
    return [...repos]
      .filter((r) => !r.archived && !r.private)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }, [repos]);

  // Auto-advance with pause on hover
  useEffect(() => {
    if (!visibleRepos.length) return;

    let intervalId;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        setCurrent((prev) => (prev + 1) % visibleRepos.length);
      }, 5000);
    };

    const stopAutoScroll = () => {
      clearInterval(intervalId);
    };

    // start initially
    startAutoScroll();

    // hover pause/resume handlers
    const carousel = document.getElementById("repo-carousel-container");
    if (carousel) {
      carousel.addEventListener("mouseenter", stopAutoScroll);
      carousel.addEventListener("mouseleave", startAutoScroll);
    }

    return () => {
      clearInterval(intervalId);
      if (carousel) {
        carousel.removeEventListener("mouseenter", stopAutoScroll);
        carousel.removeEventListener("mouseleave", startAutoScroll);
      }
    };
  }, [visibleRepos]);

  // Auto-advance
  useEffect(() => {
    if (!visibleRepos.length) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % visibleRepos.length);
    }, 5000); // 5s
    return () => clearInterval(id);
  }, [visibleRepos]);

  if (!visibleRepos.length) {
    return (
      <div className="text-sm text-gray-400">
        No public repositories to display.
      </div>
    );
  }

  const repo = visibleRepos[current];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? visibleRepos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % visibleRepos.length);
  };

  return (
    <div id="repo-carousel-container" className="relative">
      {/* Card container */}
      <div className="overflow-hidden">
        <div
          className="transition-transform duration-500"
          style={{ transform: `translateX(0)` }} // single card centered
        >
          <RepoCard repo={repo} />
        </div>
      </div>

      {/* Left/Right Controls */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2
                   w-9 h-9 items-center justify-center rounded-full 
                   border border-white/20 bg-black/50 backdrop-blur
                   hover:bg-white/10 transition"
        aria-label="Previous project"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2
                   w-9 h-9 items-center justify-center rounded-full 
                   border border-white/20 bg-black/50 backdrop-blur
                   hover:bg-white/10 transition"
        aria-label="Next project"
      >
        ›
      </button>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {visibleRepos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 w-2 rounded-full transition 
              ${idx === current ? "bg-white" : "bg-white/30"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo }) {
  const {
    name,
    description,
    language,
    stargazers_count,
    forks_count,
    html_url,
    updated_at,
    fork,
  } = repo;

  return (
    <div
      className="mx-auto max-w-xl bg-gradient-to-br from-zinc-900/90 to-black/90
                 border border-white/10 rounded-2xl p-5 md:p-6 
                 shadow-[0_18px_45px_rgba(0,0,0,0.5)] 
                 backdrop-blur-sm"
    >
      {/* Top row: name + badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center">
          <a
            href={html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 group"
          >
            <h3
              className={`text-lg md:text-xl font-semibold text-white group-hover:underline truncate ${
                fork ? "max-w-[100px]" : "max-w-[200px]"
              }`}
            >
              {name}
            </h3>

            <span className="text-xs px-2 py-0.5 rounded-full border border-white/20 text-gray-200">
              Public
            </span>
          </a>

          {fork && (
            <div className="text-[11px] inline-flex items-center gap-1 text-gray-400">
              <span className="px-1.5 py-0.5 rounded-full border border-yellow-400/40 text-yellow-200/90">
                Fork
              </span>
              <span>Customized from another repo</span>
            </div>
          )}
        </div>

        <div className="text-right text-xs text-gray-400">
          <div>Updated {formatTimeAgo(updated_at)}</div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-200 line-clamp-3">
        {description || "No description provided."}
      </p>

      {/* Meta: language, stars, forks */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-300">
        {language && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {language}
          </span>
        )}

        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
          ★ <span>{stargazers_count}</span> stars
        </span>

        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
          <i class="ph ph-git-fork" />
          <span>{forks_count}</span> forks
        </span>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <a
          href={html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 text-sm 
                     rounded-full bg-white text-black font-medium
                     hover:bg-gray-200 transition"
        >
          View on GitHub
        </a>

        <div className="text-[11px] text-gray-400">
          <span className="opacity-80">ID:</span> {repo.id}
        </div>
      </div>
    </div>
  );
}
