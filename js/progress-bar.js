function initAvatarProgress() {
  document.querySelectorAll(".avatar-progress").forEach((t) => {
    const r = Array.from(t.classList).find((t) => t.startsWith("progress-"));
    if (!r) return;
    const e = parseInt(r.replace("progress-", ""), 10);
    if (isNaN(e)) return;
    const s = t.querySelector(".progress-circle");
    if (!s) return;
    const o = parseFloat(s.getAttribute("r")) || 26,
      a = 2 * Math.PI * o;
    (s.setAttribute("stroke-dasharray", a.toString()),
      s.setAttribute("stroke-dashoffset", a.toString()));
    const n = a - (e / 100) * a;
    s.style.strokeDashoffset = n;
  });
}
document.addEventListener("DOMContentLoaded", initAvatarProgress);
