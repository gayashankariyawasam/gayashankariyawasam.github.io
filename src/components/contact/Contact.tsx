"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { GithubIcon, LinkedinIcon, ScholarIcon } from "@/components/ui/icons";

const socials = [
  {
    label: "Email",
    href: profile.socials.email,
    icon: Mail,
    handle: profile.email,
  },
  {
    label: "LinkedIn",
    href: profile.socials.linkedin,
    icon: LinkedinIcon,
    handle: "gayashan-kariyawasam",
  },
  {
    label: "GitHub",
    href: profile.socials.github,
    icon: GithubIcon,
    handle: "gayashankariyawasam",
  },
  {
    label: "Scholar",
    href: profile.socials.scholar,
    icon: ScholarIcon,
    handle: "53+ citations",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">
            06 — Contact
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <Reveal delay={0.05}>
              <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-text sm:text-6xl lg:text-7xl">
                Have an{" "}
                <span className="text-gradient">AI agent problem</span>{" "}
                worth solving?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-text-muted sm:text-lg">
                Whether it&apos;s LLM architecture, agent evaluation, AI security,
                or shaping enterprise AI strategy — I&apos;d love to hear about
                what you&apos;re building.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10">
                <Magnetic strength={0.2}>
                  <a
                    href={profile.socials.email}
                    className="group inline-flex items-center gap-3 rounded-full bg-text px-7 py-4 text-base font-medium text-bg transition-colors hover:bg-white"
                  >
                    Start a conversation
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={0.2}>
              <ul className="space-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="glass card-hover group flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/40 text-text-muted transition-colors group-hover:text-text">
                          <s.icon className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-text-subtle">
                            {s.label}
                          </div>
                          <div className="text-sm text-text">{s.handle}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
