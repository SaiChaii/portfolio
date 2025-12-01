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
import DarkModeToggle from "./DarkToggle";
import OffCanvas from "./offCanvas";

const SECTIONS = ["about", "projects", "experience", "contact"];
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
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  const [index, setIndex] = useState(-1);
  return (
    <div className="scroll-smooth flex flex-col items-center justify-center bg-neutral-900">
      {/* Header: centered horizontal bar */}
      <header className="sticky top-0 z-10 w-[36%] bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Navigation */}
          <nav className="flex flex-1 justify-center gap-2 rounded-full border border-gray-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 px-2 py-2 shadow">
            <Pill to="/about">About</Pill>
            <Pill to="/projects">Projects</Pill>
            <Pill to="/experience">Experience</Pill>
            <Pill to="/contact">Contact</Pill>
          </nav>

          {/* Dark mode toggle */}
          {/* <div className="ml-4">
            <DarkModeToggle />
          </div> */}
        </div>
      </header>

      {/* Sections (same page) */}
      <Section id="about" title="About" first>
        <About />
      </Section>

      <Section id="experience" title="Experience">
        {exp.map((item, index) => (
          <div className="mt-4 mb-4" onClick={() => setIndex(index)}>
            <Experience
              key={index}
              img={item.img}
              company={item.company}
              title={item.title}
              timeline={item.timeline}
            />
          </div>
        ))}
        {/* <Experience /> */}
      </Section>

      <Section id="projects" title="Projects">
        <Projects />
      </Section>

      <Section id="contact" title="Contact">
        <Contact />
      </Section>

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

function Pill({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-4 py-2 rounded-full font-semibold transition",
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
        "mx-auto w-full max-w-[50%] px-4 py-8",
        "scroll-mt-28",
        "bg-white dark:bg-neutral-900",
        first ? "" : "border-t border-gray-200 dark:border-neutral-700",
      ].join(" ")}
    >
      <h2 className="mb-2 text-2xl  dark:text-gray-300 font-bold">{title}</h2>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
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
