// KangaLearner — dev helper for validating question dataset integrity
(function () {
  "use strict";

  function isNonEmptyString(s) {
    return typeof s === "string" && s.trim().length > 0;
  }

  function uniqCount(arr) {
    return new Set(arr).size;
  }

  window.KL_VALIDATE_QUESTIONS = function () {
    const qs = Array.isArray(window.QUESTIONS) ? window.QUESTIONS : [];
    const cats = Array.isArray(window.CATEGORIES) ? window.CATEGORIES : [];
    const catKeys = new Set(cats.map((c) => c && c.key).filter(Boolean));

    const problems = [];
    const ids = qs.map((q) => (q ? q.id : null));
    const idSet = new Set();
    const dupIds = new Set();
    ids.forEach((id) => {
      if (!id) return;
      if (idSet.has(id)) dupIds.add(id);
      idSet.add(id);
    });

    qs.forEach((q, idx) => {
      const id = q && q.id ? q.id : "";
      if (!isNonEmptyString(id)) problems.push({ id, idx, type: "id-empty", detail: "Missing id" });
      if (dupIds.has(id)) problems.push({ id, idx, type: "id-duplicate", detail: "Duplicate id" });

      const cat = q && q.cat ? q.cat : "";
      if (!isNonEmptyString(cat))
        problems.push({ id, idx, type: "category-empty", detail: "Missing cat" });
      if (cat && !catKeys.has(cat))
        problems.push({
          id,
          idx,
          type: "category-unknown",
          detail: `Cat not in CATEGORIES: ${cat}`
        });

      const qEn = q && q.q ? q.q.en : "";
      if (!isNonEmptyString(qEn))
        problems.push({ id, idx, type: "question-en-empty", detail: "Missing q.en" });

      const expEn = q && q.exp ? q.exp.en : "";
      if (!isNonEmptyString(expEn))
        problems.push({ id, idx, type: "exp-en-empty", detail: "Missing exp.en" });

      const opts = q && Array.isArray(q.opts) ? q.opts : [];
      if (!opts.length) problems.push({ id, idx, type: "options-empty", detail: "No options" });
      const okCount = opts.filter((o) => o && o.ok === true).length;
      if (opts.length && okCount === 0)
        problems.push({ id, idx, type: "no-correct-option", detail: "No option marked ok=true" });
      if (opts.length && okCount > 1)
        problems.push({
          id,
          idx,
          type: "multi-correct-option",
          detail: `More than one correct option (${okCount})`
        });

      const states = q ? q.states : null;
      if (!Array.isArray(states))
        problems.push({ id, idx, type: "states-not-array", detail: "states is not an array" });
      else if (states.length === 0)
        problems.push({ id, idx, type: "states-empty", detail: "states is empty" });
    });

    // Derived checks
    const usedCats = new Set(qs.map((q) => q && q.cat).filter(Boolean));
    cats.forEach((c) => {
      if (!c || !c.key) return;
      if (!usedCats.has(c.key))
        problems.push({
          id: "",
          idx: -1,
          type: "category-unused",
          detail: `CATEGORIES key has no questions: ${c.key}`
        });
    });

    const summary = {
      questions: qs.length,
      uniqueIds: uniqCount(ids.filter(Boolean)),
      problems: problems.length
    };

    // Output
    console.log("[KL_VALIDATE_QUESTIONS] summary:", summary);
    if (problems.length) console.table(problems);
    else console.log("[KL_VALIDATE_QUESTIONS] OK — no issues found.");

    return { summary, problems };
  };
})();
