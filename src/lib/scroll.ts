export function scrollToId(id: string, reducedMotion: boolean) {
  document.getElementById(id)?.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

