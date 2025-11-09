import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import About from "./About";

const SECTIONS = ["about", "projects", "experience", "contact"];

/** Scroll to section matching the current pathname (e.g., /about -> #about) */
function ScrollToSection() {
  const { pathname } = useLocation();
  useEffect(() => {
    const section = pathname.replace("/", "") || "about";
    const id = SECTIONS.includes(section) ? section : "about";
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname]);
  return null;
}

function Home() {
  return (
    <div className="scroll-smooth flex flex-col items-center justify-center">
      {/* Header: centered horizontal bar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur w-[36%]">
        <nav className="mx-auto my-3 flex w-full max-w-3xl justify-center gap-2 rounded-full border border-gray-200 bg-white/70 px-2 py-2 shadow">
          <Pill to="/about">About</Pill>
          <Pill to="/projects">Projects</Pill>
          <Pill to="/experience">Experience</Pill>
          <Pill to="/contact">Contact</Pill>
        </nav>
      </header>

      {/* Sections (same page) */}
      <Section id="about" title="About" first>
        <About />
      </Section>

      <Section id="projects" title="Projects">
        Showcase a few projects with links/screenshots.
      </Section>

      <Section id="experience" title="Experience">
        Roles, companies, impact, and stack.
      </Section>

      <Section id="contact" title="Contact">
        Email, socials, or a contact form.
      </Section>
    </div>
  );
}

function Pill({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-4 py-2 rounded-full font-semibold transition",
          isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

function Section({ id, title, children, first = false }) {
  return (
    <section
      id={id}
      className={[
        "mx-auto w-full max-w-[50%] px-4 py-15",
        "scroll-mt-28", // keeps heading visible below sticky nav
        first ? "" : "border-t border-gray-200",
      ].join(" ")}
    >
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        {/* All routes render the same page; we scroll to the right section */}
        <Route path="/about" element={<Home />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/experience" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
