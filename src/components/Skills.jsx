import React from "react";
import {
  SiAmazonaws,
  SiCss3,
  SiDart,
  SiFirebase,
  SiFlutter,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import Reveal from "./ui/Reveal";

/**
 * These were eight 128px PNGs (~90KB) loaded as <img>. They are SVG components
 * now: no image requests, crisp at any size, and each carries its brand colour.
 *
 * Added since the original set: TypeScript, Next.js, Dart, and AWS — all of
 * which show up across the projects below but were missing here.
 */
const SKILLS = [
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: SiCss3, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Flutter", Icon: SiFlutter, color: "#42A5F5" },
  { name: "Dart", Icon: SiDart, color: "#0175C2" },
  { name: "AWS", Icon: SiAmazonaws, color: "#FF9900" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
];

const Skills = () => (
  <section id="skills" className="section-auto section--raised">
    <div className="shell">
      <Reveal variant="fade" className="eyebrow">
        <span>02 — Skills</span>
      </Reveal>
      <Reveal as="h2" delay={80} className="section-title">
        Technologies I work with
      </Reveal>
      <Reveal as="p" delay={150} className="section-lead">
        The tools I reach for most. Everything below shows up in the work further
        down the page.
      </Reveal>

      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 md:grid-cols-4 lg:grid-cols-6">
        {SKILLS.map((skill, i) => {
          const { Icon } = skill;
          return (
            <Reveal
              as="li"
              key={skill.name}
              delay={i * 45}
              className="skill-tile"
            >
              <Icon size={38} color={skill.color} aria-hidden="true" />
              <span className="text-sm font-medium">{skill.name}</span>
            </Reveal>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Skills;
