import { useState } from "react";

const tags = ["all", "post", "book", "drawing"];

const entries = [
  {
    id: 1,
    type: "post",
    tag: "CSS",
    title: "Why stacking contexts still trip me up",
    excerpt:
      "Every few months I rediscover that z-index only works inside the same stacking context and promptly forget again. Here's the mental model that finally stuck.",
    date: "Apr 2025",
    readTime: "4 min",
    accent: "#6B4F3A",
  },
  {
    id: 2,
    type: "book",
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    quote:
      "It is perhaps too easy to see in retrospect how much one has been complicit in one's own diminishment.",
    thought:
      "The whole book is about dignity as a cage. Stevens is so committed to professionalism that he mistakes it for a life. Quietly devastating.",
    date: "Mar 2025",
  },
  {
    id: 3,
    type: "drawing",
    title: "hands study #3",
    date: "Mar 2025",
    bg: "#D4C5A9",
    sketchLines: [
      { x1: 60, y1: 140, x2: 80, y2: 80 },
      { x1: 80, y1: 80, x2: 85, y2: 50 },
      { x1: 85, y1: 50, x2: 90, y2: 80 },
      { x1: 90, y1: 80, x2: 100, y2: 45 },
      { x1: 100, y1: 45, x2: 108, y2: 78 },
      { x1: 108, y1: 78, x2: 118, y2: 48 },
      { x1: 118, y1: 48, x2: 124, y2: 80 },
      { x1: 124, y1: 80, x2: 135, y2: 60 },
      { x1: 135, y1: 60, x2: 138, y2: 90 },
      { x1: 60, y1: 140, x2: 138, y2: 130 },
      { x1: 138, y1: 130, x2: 138, y2: 90 },
      { x1: 70, y1: 140, x2: 65, y2: 160 },
      { x1: 65, y1: 160, x2: 90, y2: 170 },
      { x1: 90, y1: 170, x2: 138, y2: 155 },
      { x1: 138, y1: 155, x2: 138, y2: 130 },
    ],
  },
  {
    id: 4,
    type: "post",
    tag: "Browser",
    title: "Event delegation is underrated",
    excerpt:
      "Attaching one listener to a parent instead of hundreds to children isn't just a perf trick — it fundamentally changes how you think about dynamic DOM.",
    date: "Feb 2025",
    readTime: "3 min",
    accent: "#8B6E52",
    image: true,
  },
  {
    id: 5,
    type: "book",
    title: "Piranesi",
    author: "Susanna Clarke",
    quote:
      "The Beauty of the House is immeasurable; its Kindness infinite.",
    thought:
      "A book about a man who has forgotten himself, written in the voice of someone piecing the world together from pure observation. The form IS the story.",
    date: "Jan 2025",
  },
  {
    id: 6,
    type: "drawing",
    title: "coffee shop, Tuesday",
    date: "Feb 2025",
    bg: "#C9B99A",
    sketchLines: [
      { x1: 70, y1: 160, x2: 130, y2: 160 },
      { x1: 75, y1: 160, x2: 80, y2: 110 },
      { x1: 125, y1: 160, x2: 120, y2: 110 },
      { x1: 80, y1: 110, x2: 120, y2: 110 },
      { x1: 95, y1: 110, x2: 90, y2: 90 },
      { x1: 105, y1: 110, x2: 110, y2: 90 },
      { x1: 90, y1: 90, x2: 110, y2: 90 },
      { x1: 100, y1: 90, x2: 100, y2: 75 },
      { x1: 90, y1: 75, x2: 110, y2: 75 },
      { x1: 120, y1: 130, x2: 135, y2: 135 },
      { x1: 135, y1: 135, x2: 133, y2: 145 },
    ],
  },
  {
    id: 7,
    type: "post",
    tag: "Performance",
    title: "What I learned profiling a real app with Lighthouse",
    excerpt:
      "The score is almost never the point. The waterfall is. Here's what I found hiding in a client project that looked fine on the surface.",
    date: "Jan 2025",
    readTime: "6 min",
    accent: "#5C4030",
  },
  {
    id: 8,
    type: "book",
    title: "Ways of Seeing",
    author: "John Berger",
    quote:
      "We never look at just one thing; we are always looking at the relation between things and ourselves.",
    thought:
      "Changed how I look at interfaces. Every design choice is a claim about who is looking and why. Very relevant to building UIs people actually inhabit.",
    date: "Dec 2024",
  },
  {
    id: 9,
    type: "drawing",
    title: "plant on my desk",
    date: "Jan 2025",
    bg: "#BDB09A",
    sketchLines: [
      { x1: 100, y1: 165, x2: 100, y2: 120 },
      { x1: 100, y1: 140, x2: 75, y2: 110 },
      { x1: 75, y1: 110, x2: 65, y2: 90 },
      { x1: 100, y1: 130, x2: 125, y2: 100 },
      { x1: 125, y1: 100, x2: 135, y2: 80 },
      { x1: 100, y1: 125, x2: 80, y2: 95 },
      { x1: 100, y1: 120, x2: 115, y2: 88 },
      { x1: 85, y1: 160, x2: 115, y2: 160 },
      { x1: 82, y1: 165, x2: 118, y2: 165 },
    ],
  },
];

function PostCard({ entry, visible }) {
  return (
    <article
      style={{
        background: "#FAF7F2",
        border: "1px solid #E8DDD0",
        borderRadius: "2px",
        padding: "28px 32px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = entry.accent || "#8B6E52";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E8DDD0";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: entry.accent || "#8B6E52",
            background: `${entry.accent}18` || "#8B6E5218",
            padding: "4px 10px",
            borderRadius: "2px",
          }}
        >
          {entry.tag}
        </span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: "#B0A090", letterSpacing: "0.05em" }}>
          {entry.readTime} · {entry.date}
        </span>
      </div>

      <h2
        style={{
          fontFamily: "'Newsreader', serif",
          fontSize: "22px",
          fontWeight: 400,
          color: "#2C1F14",
          lineHeight: 1.3,
          marginBottom: "12px",
          fontStyle: "italic",
        }}
      >
        {entry.title}
      </h2>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: "#7A6A5A",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {entry.excerpt}
      </p>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: entry.accent || "#8B6E52",
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.3s ease",
        }}
        className="underline-bar"
      />
    </article>
  );
}

function BookCard({ entry, visible }) {
  return (
    <article
      style={{
        background: "#2C1F14",
        borderRadius: "2px",
        padding: "32px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#C4A882",
            border: "1px solid #4A3525",
            padding: "4px 10px",
            borderRadius: "2px",
          }}
        >
          Book
        </span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: "#6B5543", letterSpacing: "0.05em" }}>
          {entry.date}
        </span>
      </div>

      <div style={{ borderLeft: "2px solid #6B4F3A", paddingLeft: "20px", marginBottom: "20px" }}>
        <p
          style={{
            fontFamily: "'Newsreader', serif",
            fontSize: "18px",
            fontStyle: "italic",
            color: "#E8D5BE",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          "{entry.quote}"
        </p>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <span style={{ fontFamily: "'Newsreader', serif", fontSize: "15px", color: "#FAF7F2", fontWeight: 500 }}>
          {entry.title}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B5543", marginLeft: "8px" }}>
          — {entry.author}
        </span>
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          color: "#A89070",
          lineHeight: 1.7,
          margin: 0,
          borderTop: "1px solid #3A2A1A",
          paddingTop: "16px",
        }}
      >
        {entry.thought}
      </p>
    </article>
  );
}

function DrawingCard({ entry, visible }) {
  return (
    <article
      style={{
        background: entry.bg,
        borderRadius: "2px",
        padding: "24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) rotate(0deg)" : "translateY(18px) rotate(0deg)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "rotate(-0.8deg) scale(1.01)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "rotate(0deg) scale(1)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#5C3D20",
            opacity: 0.6,
          }}
        >
          Drawing
        </span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: "#5C3D20", opacity: 0.5 }}>
          {entry.date}
        </span>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.35)",
          borderRadius: "1px",
          height: "180px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {entry.sketchLines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#3A2510"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          ))}
        </svg>
      </div>

      <p
        style={{
          fontFamily: "'Newsreader', serif",
          fontSize: "14px",
          fontStyle: "italic",
          color: "#3A2510",
          margin: 0,
          opacity: 0.8,
        }}
      >
        {entry.title}
      </p>
    </article>
  );
}

export default function LogPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visible, setVisible] = useState(true);

  const filtered =
    activeFilter === "all" ? entries : entries.filter((e) => e.type === activeFilter);

  const handleFilter = (t) => {
    setVisible(false);
    setTimeout(() => {
      setActiveFilter(t);
      setVisible(true);
    }, 200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F0E8",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 50,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "60px 32px 100px" }}>

        {/* Header */}
        <header style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "10px" }}>
            <h1
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: "clamp(36px, 5vw, 52px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#2C1F14",
                margin: 0,
                lineHeight: 1,
              }}
            >
              log
            </h1>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#B0A090",
              }}
            >
              {new Date().getFullYear()}
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#9A8878",
              margin: 0,
              lineHeight: 1.6,
              maxWidth: "420px",
            }}
          >
            things I'm reading, thinking about, building, and drawing. no particular order.
          </p>
        </header>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "48px", flexWrap: "wrap" }}>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => handleFilter(t)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "7px 14px",
                borderRadius: "2px",
                border: activeFilter === t ? "1px solid #2C1F14" : "1px solid #D8CEBC",
                background: activeFilter === t ? "#2C1F14" : "transparent",
                color: activeFilter === t ? "#FAF7F2" : "#9A8878",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((entry, i) => {
            const props = {
              entry,
              visible,
              style: { transitionDelay: `${i * 60}ms` },
            };
            if (entry.type === "post") return <PostCard key={entry.id} {...props} />;
            if (entry.type === "book") return <BookCard key={entry.id} {...props} />;
            if (entry.type === "drawing") return <DrawingCard key={entry.id} {...props} />;
            return null;
          })}
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: "72px",
            paddingTop: "32px",
            borderTop: "1px solid #D8CEBC",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "'Newsreader', serif", fontSize: "13px", fontStyle: "italic", color: "#B0A090" }}>
            updated whenever
          </span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8B89A" }}>
            {filtered.length} {activeFilter === "all" ? "entries" : activeFilter + "s"}
          </span>
        </div>
      </div>
    </div>
  );
}
