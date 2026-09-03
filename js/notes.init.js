$(document).ready(function () {
  const e = $("#notes-grid"),
    t = $("#pinned-notes-grid"),
    a = $("#search-notes"),
    i = $("#category-list"),
    n = $("#all-notes-count"),
    s = $("#important-notes-count"),
    r = $("#addNoteForm"),
    o = $("#save-note-btn"),
    d = $("#addNoteModal"),
    l = $("#note-title-input"),
    c = $("#note-category-select"),
    p = $("#note-description-textarea"),
    u = $("#note-id");
  let g = "all";
  let m = JSON.parse(localStorage.getItem("notes-data")) || [
    {
      id: 1,
      title: "Design Weekly Meeting",
      description:
        "Discussion on the new dashboard design and user feedback from the latest beta testing phase. We need to focus on micro-interactions.",
      category: "Personal",
      priority: "Low",
      isPinned: !1,
      date: "2 mins ago",
      users: [
        "assets/images/users/avatar-2.png",
        "assets/images/users/avatar-3.png",
      ],
    },
    {
      id: 2,
      title: "Client Requirement Checklist",
      description:
        "Responsive layout, Dark mode support, Multi-language integration, and Accessibility compliance.",
      category: "Business",
      priority: "High",
      isPinned: !1,
      date: "1 hour ago",
      users: [],
    },
    {
      id: 3,
      title: "Weekend Trip Ideas",
      description:
        "Planning a small getaway for the team to the Mountain View Resort or the Lakeside Cabin for team building activities.",
      category: "Social",
      priority: "Low",
      isPinned: !1,
      date: "Yesterday",
      users: ["+5"],
    },
    {
      id: 4,
      title: "Grocery List for Party",
      description:
        "Milk, Eggs, Bread, Avocados, Coffee Beans, Green Tea, Blueberries, Sparkling water, Paper plates and napkins.",
      category: "Personal",
      priority: "Medium",
      isPinned: !0,
      date: "Apr 18, 2026",
      users: [],
    },
    {
      id: 5,
      title: "Q3 Project Roadmap",
      description:
        "Finalizing the milestones for the upcoming quarter. Key focus areas: Performance optimization and Mobile App launch.",
      category: "Business",
      priority: "High",
      isPinned: !0,
      date: "Apr 15, 2026",
      users: ["assets/images/users/avatar-4.png"],
    },
    {
      id: 6,
      title: "Health & Fitness Goals",
      description:
        "Morning run for 30 minutes, Drink 3 liters of water daily, and consistent sleep schedule (7-8 hours).",
      category: "Personal",
      priority: "High",
      isPinned: !1,
      date: "3 days ago",
      users: [],
    },
    {
      id: 7,
      title: "Dinner Reservations",
      description:
        "Booked a table for 4 at The Bistro for Friday night. Need to confirm the time by Thursday afternoon.",
      category: "Social",
      priority: "Low",
      isPinned: !1,
      date: "1 week ago",
      users: ["assets/images/users/avatar-6.png"],
    },
  ];
  function f() {
    localStorage.setItem("notes-data", JSON.stringify(m));
  }
  function v(a = "all", i = "") {
    (e.empty(), t.empty());
    let r = m.filter((e) => {
      const t = "all" === a || e.category.toLowerCase() === a.toLowerCase(),
        n =
          e.title.toLowerCase().includes(i.toLowerCase()) ||
          e.description.toLowerCase().includes(i.toLowerCase());
      return t && n;
    });
    const o = r.filter((e) => e.isPinned),
      d = r.filter((e) => !e.isPinned);
    (o.length > 0
      ? ($("#pinned-notes-section").show(), o.forEach((e) => t.append(y(e))))
      : $("#pinned-notes-section").hide(),
      d.forEach((t) => e.append(y(t))),
      e.append(
        '\n            <div class="col-sm-6 col-xxl-4">\n                <a href="#!" class="card card-h-100 border d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#addNoteModal">\n                    <div class="card-body text-center p-5 d-flex align-items-center justify-content-center">\n                        <div>\n                            <div class="avatar-md bg-soft-primary text-primary rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center">\n                                <i data-eva="plus-circle-outline" class="size-6"></i>\n                            </div>\n                            <h6 class="mb-1">Add New Note</h6>\n                            <p class="text-muted fs-13 mb-0">Click to create a new note</p>\n                        </div>\n                    </div>\n                </a>\n            </div>\n        ',
      ),
      n.text(m.length),
      s.text(m.filter((e) => "Important" === e.category).length),
      "undefined" != typeof eva && eva.replace());
  }
  function y(e) {
    const t = (function (e) {
        switch (e.toLowerCase()) {
          case "personal":
            return "badge-label-success";
          case "business":
            return "badge-label-warning";
          case "social":
            return "badge-label-info";
          case "important":
            return "badge-label-danger";
          default:
            return "badge-label-secondary";
        }
      })(e.category),
      a =
        "High" === e.priority
          ? '<span class="badge badge-label-danger"><i data-eva="alert-circle-outline" class="size-3 me-1"></i> High Priority</span>'
          : "";
    let i = "";
    return (
      e.users &&
        e.users.length > 0 &&
        ((i = '<div class="avatar-group avatar-group-sm">'),
        e.users.forEach((e) => {
          e.startsWith("+")
            ? (i += `<div class="avatar avatar-circle border border-white bg-soft-primary text-primary fs-10"><span>${e}</span></div>`)
            : (i += `<a href="#!" class="avatar avatar-circle border border-white"><img src="${e}" alt="User" class="avatar-2xs rounded-circle"></a>`);
        }),
        (i += "</div>")),
      `\n            <div class="col-sm-6 col-xxl-4">\n                <div class="card card-h-100 ${e.isPinned ? "shadow-sm border-0 border-start border-primary border-4" : ""}">\n                    <div class="card-body">\n                        <div class="d-flex align-items-center justify-content-between mb-4">\n                            <span class="badge ${t} px-2 py-1 fs-12">${e.category}</span>\n                            <div class="dropdown">\n                                <a href="#!" class="text-muted" data-bs-toggle="dropdown">\n                                    <i data-eva="more-horizontal-outline" class="size-5"></i>\n                                </a>\n                                <ul class="dropdown-menu dropdown-menu-end">\n                                    <li><a class="dropdown-item edit-note" href="#!" data-id="${e.id}"><i data-eva="edit-2-outline" class="size-4 me-2"></i> Edit</a></li>\n                                    <li><a class="dropdown-item pin-note" href="#!" data-id="${e.id}"><i data-eva="pin-outline" class="size-4 me-2"></i> ${e.isPinned ? "Unpin" : "Pin"}</a></li>\n                                    <li><hr class="dropdown-divider"></li>\n                                    <li><a class="dropdown-item text-danger delete-note" href="#!" data-id="${e.id}"><i data-eva="trash-2-outline" class="size-4 me-2 text-danger"></i> Delete</a></li>\n                                </ul>\n                            </div>\n                        </div>\n                        <h5 class="card-title text-truncate mb-3 fs-16 fw-bold">${e.title}</h5>\n                        <p class="text-muted mb-4 fs-14">${e.description}</p>\n                        <div class="mt-auto pt-3 ${e.isPinned ? "border-top" : ""} d-flex align-items-center justify-content-between">\n                            <div class="d-flex align-items-center gap-2">\n                                <i data-eva="clock-outline" class="size-4 text-muted"></i>\n                                <span class="fs-13 text-muted">${e.date}</span>\n                            </div>\n                            ${e.isPinned ? '<i data-eva="pin" class="size-4 text-primary"></i>' : i || a}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        `
    );
  }
  (a.on("input", function () {
    v(g, $(this).val());
  }),
    i.on("click", ".category-link", function (e) {
      (e.preventDefault(),
        $(".category-link").removeClass("active bg-soft-primary text-primary"),
        $(this).addClass("active bg-soft-primary text-primary"),
        (g = $(this).data("category")),
        v(g, a.val()),
        $("#notes-title").text(
          "all" === g
            ? "Recent Notes"
            : g.charAt(0).toUpperCase() + g.slice(1) + " Notes",
        ));
    }),
    o.on("click", function () {
      const e = u.val(),
        t = l.val(),
        i = c.val(),
        n = $("#note-priority-select").val(),
        s = p.val();
      if (t) {
        if (e) {
          const a = m.findIndex((t) => t.id == e);
          -1 !== a &&
            (m[a] = {
              ...m[a],
              title: t,
              category: i,
              priority: n,
              description: s,
            });
        } else {
          const e = {
            id: Date.now(),
            title: t,
            description: s,
            category: i,
            priority: n,
            isPinned: !1,
            date: "Just now",
            users: [],
          };
          m.unshift(e);
        }
        (f(), v(g, a.val()), d.modal("hide"), r[0].reset(), u.val(""));
      } else alert("Please enter a title");
    }),
    $(document).on("click", ".delete-note", function (e) {
      e.preventDefault();
      const t = $(this).data("id");
      confirm("Are you sure you want to delete this note?") &&
        ((m = m.filter((e) => e.id != t)), f(), v(g, a.val()));
    }),
    $(document).on("click", ".pin-note", function (e) {
      e.preventDefault();
      const t = $(this).data("id"),
        i = m.findIndex((e) => e.id == t);
      -1 !== i && ((m[i].isPinned = !m[i].isPinned), f(), v(g, a.val()));
    }),
    $(document).on("click", ".edit-note", function (e) {
      e.preventDefault();
      const t = $(this).data("id"),
        a = m.find((e) => e.id == t);
      a &&
        (u.val(a.id),
        l.val(a.title),
        c.val(a.category),
        $("#note-priority-select").val(a.priority),
        p.val(a.description),
        $("#addNoteModalLabel").text("Edit Note"),
        d.modal("show"));
    }),
    d.on("hidden.bs.modal", function () {
      (r[0].reset(),
        u.val(""),
        $("#addNoteModalLabel").text("Create New Note"));
    }),
    v());
});
