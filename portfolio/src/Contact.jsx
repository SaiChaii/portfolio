import React from "react";
import linkedin from "./assets/linkedin.svg";
import github from "./assets/github.svg";
import discord from "./assets/discord.svg";
import gmail from "./assets/gmail.svg";

const Contact = () => {
  return (
    <div className="flex items-center mx-auto w-[50%] justify-between">
      <div className="flex items-center">
        <a
          href="https://www.linkedin.com/in/chaitanyadudi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} alt="linkedin" className="w-8 h-8" />
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="https://github.com/SaiChaii"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="github" className="w-8 h-8" />
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="https://discord.com/users/794186535888748556"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={discord} alt="discord" className="w-8 h-8" />
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=chaitanyareddydudi@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={gmail} alt="gmail" className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
