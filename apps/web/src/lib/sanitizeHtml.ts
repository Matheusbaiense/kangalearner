const ALLOWED_TAGS = ["b", "strong", "i", "em", "u", "br", "p", "ul", "ol", "li", "code"] as const;

function escapeHtml(s: string): string {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Minimal, dependency-free sanitizer for small inline rich-text fields.
 * - Escapes everything
 * - Re-allows a tiny tag allowlist (no attributes)
 */
export function sanitizeHtml(html: string): string {
  let out = escapeHtml(html);

  // Allow basic tags with no attributes.
  for (const tag of ALLOWED_TAGS) {
    if (tag === "br") {
      out = out
        .replaceAll("&lt;br&gt;", "<br>")
        .replaceAll("&lt;br/&gt;", "<br>")
        .replaceAll("&lt;br /&gt;", "<br>");
      continue;
    }
    out = out.replaceAll(`&lt;${tag}&gt;`, `<${tag}>`).replaceAll(`&lt;/${tag}&gt;`, `</${tag}>`);
  }

  return out;
}
