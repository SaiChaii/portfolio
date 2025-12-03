import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Projects from "./Projects";
import Experience from "./Experience";
import OffCanvas from "./OffCanvas";

const exp = [
  {
    id: 1,
    img: "mewurk_logo.jpeg",
    company: "Mewurk Technologies",
    title: "Front-End Developer",
    timeline: "June 2024 - Present",
    duration: "1 Year",
    location: "Bangalore, India",
    skills: [
      "React",
      "Redux",
      "JavaScript",
      "Axios",
      "Tailwind CSS",
      "C#/.NET (collaboration)",
    ],
    contributions: [
      {
        id: 1,
        title: "Advanced UI Components",
        details: [
          "Built off-canvas sliders, roasters, banners, and dynamic forms",
          "Implemented reusable and scalable React components",
          "Designed smooth transitions and responsive layouts",
        ],
      },
      {
        id: 2,
        title: "State Management",
        details: [
          "Used Redux for global state handling across complex modules",
          "Managed API state, loading states, and cached repeated data",
          "Improved app performance by preventing unnecessary re-renders",
        ],
      },
      {
        id: 3,
        title: "API Integrations",
        details: [
          "Integrated multiple REST APIs using Axios",
          "Configured interceptors, authentication headers, and error handling",
          "Collaborated with backend team to optimize API structures",
        ],
      },
      {
        id: 4,
        title: "UI Architecture",
        details: [
          "Built clean folder structures and reusable UI blocks",
          "Implemented custom hooks and utility functions",
          "Improved maintainability with clean naming and component patterns",
        ],
      },
      {
        id: 5,
        title: "Functional Modules",
        details: [
          "Worked on Payroll & Payrun flows",
          "Contributed to Attendance/Roster scheduling",
          "Developed components for Experience & Organization UI",
        ],
      },
      {
        id: 6,
        title: "UI/UX Enhancements",
        details: [
          "Improved spacing, alignment, and typography consistency",
          "Added micro-interactions and smooth visual transitions",
          "Fixed UX issues reported by QA and users",
        ],
      },
      {
        id: 7,
        title: "Debugging & Performance",
        details: [
          "Solved API edge cases and UI rendering bugs",
          "Optimized slow screens and minimized unnecessary API calls",
          "Improved stability across major modules",
        ],
      },
      {
        id: 8,
        title: "Team Collaboration",
        details: [
          "Followed Agile workflow with Jira",
          "Participated in daily standups and feature discussions",
          "Worked with QA and backend engineers to deliver modules",
        ],
      },
    ],
  },
];

const SECTIONS = ["about", "experience", "projects", "contact"];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 768;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");

    const handler = (e) => setIsDesktop(e.matches);
    handler(mq);

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

function ScrollToSection() {
  const { pathname } = useLocation();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) return;

    const section = pathname.replace("/", "") || "about";
    const id = SECTIONS.includes(section) ? section : "about";
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname, isDesktop]);

  return null;
}

function Home() {
  const { pathname } = useLocation();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const [index, setIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionFromPath = pathname.replace("/", "") || "about";
  const currentSection = SECTIONS.includes(sectionFromPath)
    ? sectionFromPath
    : "about";

  return (
    <div className="scroll-smooth flex flex-col items-center bg-neutral-900 min-h-screen">
      <header className="sticky top-0 z-20 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-white/10">
        <div className="px-4 py-3 md:px-8">
          <div className="flex items-center justify-between md:hidden">
            <div className="text-lg font-semibold text-white">SaiChaii.dev</div>
            <button
              className="text-xl text-gray-200"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>

          <div className="hidden md:flex justify-center">
            <div
              className="flex items-center gap-4 w-full max-w-4xl 
                   rounded-full border border-gray-200/60 dark:border-neutral-700 
                   bg-neutral-900/90 px-4 py-2 shadow"
            >
              <div className="text-base font-semibold text-white whitespace-nowrap">
                SaiChaii.dev
              </div>

              <nav className="flex flex-1 justify-center gap-2">
                <Pill to="/about">About</Pill>
                <Pill to="/experience">Experience</Pill>
                <Pill to="/projects">Projects</Pill>
                <Pill to="/contact">Contact</Pill>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`fixed top-0 right-0 h-full w-64 z-30 bg-neutral-900 text-white
        shadow-xl transform transition-transform duration-300 
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-white/10">
          <span className="font-semibold">Menu</span>
          <button className="text-xl" onClick={() => setMenuOpen(false)}>
            ✖
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <Pill to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Pill>
          <Pill to="/projects" onClick={() => setMenuOpen(false)}>
            Projects
          </Pill>
          <Pill to="/experience" onClick={() => setMenuOpen(false)}>
            Experience
          </Pill>
          <Pill to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Pill>
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      {isDesktop ? (
        <>
          <Section id="about" title="About" first>
            <About />
          </Section>

          <Section id="experience" title="Experience">
            {exp.map((item, i) => (
              <div key={i} className="mt-4 mb-4" onClick={() => setIndex(i)}>
                <Experience
                  img={item.img}
                  company={item.company}
                  title={item.title}
                  timeline={item.timeline}
                />
              </div>
            ))}
          </Section>

          <Section id="projects" title="Projects">
            <Projects />
          </Section>

          <Section id="contact" title="Contact">
            <Contact />
          </Section>
        </>
      ) : (
        <>
          {currentSection === "about" && (
            <Section id="about" title="About" first>
              <About />
            </Section>
          )}

          {currentSection === "experience" && (
            <Section id="experience" title="Experience" first>
              {exp.map((item, i) => (
                <div key={i} className="mt-4 mb-4" onClick={() => setIndex(i)}>
                  <Experience
                    img={item.img}
                    company={item.company}
                    title={item.title}
                    timeline={item.timeline}
                  />
                </div>
              ))}
            </Section>
          )}

          {currentSection === "projects" && (
            <Section id="projects" title="Projects" first>
              <Projects />
            </Section>
          )}

          {currentSection === "contact" && (
            <Section id="contact" title="Contact" first>
              <Contact />
            </Section>
          )}
        </>
      )}
      {index >= 0 && (
        <OffCanvas
          data={exp[index]}
          open={index >= 0}
          onClose={() => setIndex(-1)}
        />
      )}
    </div>
  );
}

function Pill({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "px-4 py-2 rounded-full font-semibold transition text-sm",
          isActive
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700",
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
        "mx-auto w-full max-w-full md:max-w-[50%] px-4 sm:px-6 lg:px-10 py-8",
        "scroll-mt-28",
        "bg-neutral-900",
        first ? "" : "border-t border-gray-200 dark:border-neutral-700",
      ].join(" ")}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <h2 className="mb-2 text-2xl dark:text-gray-300 font-bold">{title}</h2>

        {title === "Experience" && (
          <div className="text-sm dark:text-gray-300 sm:mt-0 sm:mb-1">
            (Tap to view more)
          </div>
        )}
      </div>

      <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        {/* All routes render Home; Home decides mobile vs desktop behavior */}
        <Route path="/about" element={<Home />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/experience" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </>
  );
}
