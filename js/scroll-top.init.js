function initScrollTop() {
  const e = document.getElementById("progress-scroll"),
    t = document.querySelector(".progress-wrap path");
  if (!e || !t) return;
  const o = t.getTotalLength();
  ((t.style.strokeDasharray = `${o} ${o}`), (t.style.strokeDashoffset = o));
  const s = () => {
    const e = window.scrollY || document.documentElement.scrollTop,
      s = document.documentElement.scrollHeight - window.innerHeight,
      n = o - (e * o) / s;
    t.style.strokeDashoffset = n;
  };
  (s(), window.addEventListener("scroll", s));
  (window.addEventListener("scroll", () => {
    window.scrollY > 50
      ? e.classList.add("active-progress")
      : e.classList.remove("active-progress");
  }),
    e.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));
}

document.addEventListener("DOMContentLoaded", () => {
  window.LayoutIncludes && window.LayoutIncludes.ready
    ? window.LayoutIncludes.ready.then(initScrollTop)
    : initScrollTop();
});
