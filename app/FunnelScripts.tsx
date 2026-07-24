"use client";

import { useEffect } from "react";

/* Client island for the Govind VSL landing page:
   reveal-on-scroll, the FAQ accordion, the VSL poster→video swap, and the
   sticky CTA (shows after the hero, hides over the mid + final CTA bands).
   Everything queries the server-rendered markup by class/id and FAILS OPEN
   (content visible if JS or motion never fires). */

// Drop the real film at /public/vsl.mp4 and set this to "/vsl.mp4".
const VSL_SRC = "";

export default function FunnelScripts() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js"); // arms the reveal hidden-state only when JS is on
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- reveal-on-scroll ----
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let io: IntersectionObserver | undefined;
    if (!("IntersectionObserver" in window) || reduce) {
      reveals.forEach((e) => e.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io!.unobserve(e.target);
            }
          }),
        { threshold: 0.12 }
      );
      reveals.forEach((e) => {
        if (e.getBoundingClientRect().top > innerHeight * 0.92) io!.observe(e);
        else e.classList.add("in");
      });
    }

    // ---- FAQ accordion ----
    const items = Array.from(document.querySelectorAll<HTMLElement>(".faq-item"));
    const setOpen = (item: HTMLElement, open: boolean) => {
      const panel = item.querySelector<HTMLElement>(".faq-a");
      const btn = item.querySelector<HTMLButtonElement>(".faq-q");
      if (!panel) return;
      item.classList.toggle("open", open);
      btn?.setAttribute("aria-expanded", open ? "true" : "false");
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    };
    const faqCleanups: (() => void)[] = [];
    items.forEach((item) => {
      // honour the server-rendered "Most asked" item that ships open
      setOpen(item, item.classList.contains("open"));
      const btn = item.querySelector<HTMLButtonElement>(".faq-q");
      if (!btn) return;
      const onClick = () => {
        const willOpen = !item.classList.contains("open");
        items.forEach((o) => o !== item && setOpen(o, false));
        setOpen(item, willOpen);
      };
      btn.addEventListener("click", onClick);
      faqCleanups.push(() => btn.removeEventListener("click", onClick));
    });
    // keep an open panel sized correctly on resize
    const onResize = () => {
      const open = document.querySelector<HTMLElement>(".faq-item.open .faq-a");
      if (open) open.style.maxHeight = open.scrollHeight + "px";
    };
    addEventListener("resize", onResize);

    // ---- VSL poster → video swap ----
    const vsl = document.getElementById("vsl");
    const play = () => {
      if (!vsl) return;
      const video = vsl.querySelector<HTMLVideoElement>("video[data-vsl-src]");
      if (VSL_SRC && video) {
        video.src = VSL_SRC;
        video.style.display = "block";
        video.controls = true;
        vsl.classList.add("playing");
        video.play().catch(() => {});
      } else {
        // no film wired yet: clear the vignette so the frame reads as "armed"
        vsl.classList.add("playing");
      }
    };
    const onVslKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        play();
      }
    };
    if (vsl) {
      vsl.addEventListener("click", play);
      vsl.addEventListener("keydown", onVslKey);
    }

    // ---- sticky CTA: show past the hero, hide over the CTA bands ----
    const scta = document.getElementById("scta");
    let mio: IntersectionObserver | undefined;
    if (scta) {
      const hero = document.querySelector(".hero");
      const ctaBands = Array.from(document.querySelectorAll(".midband, .finale"));
      const inView = new Set<Element>();
      let heroOut = false;
      mio = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.target === hero) {
              heroOut = !e.isIntersecting;
              return;
            }
            if (e.isIntersecting) inView.add(e.target);
            else inView.delete(e.target);
          });
          scta.classList.toggle("show", heroOut && inView.size === 0);
        },
        { threshold: 0 }
      );
      if (hero) mio.observe(hero);
      ctaBands.forEach((el) => mio!.observe(el));
    }

    return () => {
      io?.disconnect();
      mio?.disconnect();
      removeEventListener("resize", onResize);
      faqCleanups.forEach((fn) => fn());
      if (vsl) {
        vsl.removeEventListener("click", play);
        vsl.removeEventListener("keydown", onVslKey);
      }
    };
  }, []);

  return null;
}
