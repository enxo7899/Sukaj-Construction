// Global 404 page — required when root layout is under [locale] dynamic segment.
// See next.config.ts experimental.globalNotFound.
// This page bypasses the normal layout render and must be self-contained.
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "sans-serif",
          background: "#faf6ee",
          color: "#241f1a",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "2rem",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#b96a43",
          }}
        >
          404
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: 400, textAlign: "center", maxWidth: "24rem" }}>
          Page not found.
        </h1>
        <Link
          href="/en"
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#b96a43",
            textDecoration: "none",
          }}
        >
          ← Return home
        </Link>
      </body>
    </html>
  );
}
