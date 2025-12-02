import React from "react";

const About = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        I’m Sai Chaitanya Reddy, a Software Engineer passionate about
        <span className="text-red-500"> Web Developement.</span>
      </div>
      <div>
        Currently working at
        <a
          href="https://www.mewurk.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:underline"
        >
          {" "}
          Mewurk Technologies
        </a>
        , I focus on building solutions at the intersection of Frontend,
        Backend, and Databases.
      </div>
      <div>
        AI’ve always been curious about learning and experimenting with new
        technologies, and I actively contribute to both commercial projects and
        personal learning.
      </div>
      <div className="flex rounded-sm border border-white p-4">
        <div className="flex gap-6">
          <div className="font-bold text-[1.3rem]">Links</div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <i class="ph ph-link" />
              <a
                href="https://leetcode.com/u/Chaitanya966/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LeetCode
              </a>
            </div>
            <div className="flex items-center gap-1">
              <i class="ph ph-link" />
              <a
                href="https://github.com/SaiChaii"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default About;
