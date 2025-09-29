import { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Footer from "../sub-components/Footer.jsx"
import { useOutletContext } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

// ---------- Data (example) ----------
// Albums
const albums = [
  {
    cover:
      "https://m.media-amazon.com/images/I/51yCstSkojL._UX358_FMwebp_QL85_.jpg",
    title: "Me And All My Demons",
    year: "2025",
    // embedUrl: "https://bandcamp.com/EmbeddedPlayer/album=XXXXX/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/",
  },
]

// Songs / Singles
const songs = [
  {
    cover: "https://f4.bcbits.com/img/a4017605712_2.jpg",
    title: "Eurydice",
    year: "2023",
    purchaseUrl: "https://jawfane.bandcamp.com/track/eurydice",
    albumTitle: "",
  },
  {
    cover: "https://f4.bcbits.com/img/a4032397493_2.jpg",
    title: "Shapeshifter",
    year: "2022",
    purchaseUrl: "https://jawfane.bandcamp.com/track/shapeshifter",
    albumTitle: "",
  },
  {
    cover: "https://f4.bcbits.com/img/a1776258722_2.jpg",
    title: "Witness Marks",
    year: "2022",
    purchaseUrl: "https://jawfane.bandcamp.com/track/witness-marks",
    albumTitle: "",
  },
  {
    cover: "https://f4.bcbits.com/img/a3395170458_2.jpg",
    title: "Amber Tokens",
    year: "2022",
    purchaseUrl: "https://jawfane.bandcamp.com/track/amber-tokens",
    albumTitle: "",
  },
  {
    cover: "https://f4.bcbits.com/img/a0383793858_2.jpg",
    title: "Apparition",
    year: "2021",
    purchaseUrl: "https://jawfane.bandcamp.com/track/apparition",
    albumTitle: "",
  },
]

// ----------------------------------------------------

export default function Store() {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const [openEmbed, setOpenEmbed] = useState(null)
  const { isMobile } = useOutletContext() || {}

  // read initial view from URL (?type=songs | albums)
  const initialView = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const t = (params.get("type") || "albums").toLowerCase()
    return t === "songs" ? "songs" : "albums"
  }, [])
  const [view, setView] = useState(initialView) // 'albums' | 'songs'

  // sync URL when switching tabs
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set("type", view)
    const newUrl = `${window.location.pathname}?${params.toString()}${
      window.location.hash
    }`
    window.history.replaceState({}, "", newUrl)
  }, [view])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-kicker, .hero-title, .hero-sub", {
        y: 24,
        opacity: 0,
        ease: "power3.out",
        duration: 0.9,
        stagger: 0.08,
      })

      gsap.to(".blob", {
        yPercent: 12,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      })

      // animate cards on mount & on view switch
      ScrollTrigger.batch(".media-card", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 28,
            ease: "power3.out",
            duration: 0.7,
            stagger: 0.06,
          }),
      })
    })

    return () => ctx.revert()
  }, [view])

  const data = view === "albums" ? albums : songs
  const headingAccent = view === "albums" ? "Albums" : "Songs"

  return (
    <>
      <main className="relative bg-neutral-950 selection:bg-fuchsia-500/30 min-h-screen text-neutral-100">
        {/* Background accents */}
        <div
          aria-hidden
          className="-top-32 absolute inset-x-0 bg-gradient-to-br from-fuchsia-600/30 via-indigo-600/25 to-cyan-500/20 blur-3xl mx-auto rounded-full w-[40rem] h-[40rem] pointer-events-none blob"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

        {/* Hero */}
        <section ref={heroRef} className="z-10 relative">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-24 w-full max-w-7xl">
            <p className="inline-flex items-center gap-2 bg-white/5 backdrop-blur mb-3 px-3 py-1 border border-white/10 rounded-full text-white/70 text-xs uppercase tracking-[0.2em] hero-kicker">
              <span className="inline-block bg-fuchsia-500 rounded-full w-1.5 h-1.5" />
              New + Classics
            </p>
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-balance tracking-tight hero-title">
              Jawfane <span className="text-fuchsia-400">{headingAccent}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-white/70 text-lg hero-sub">
              Stream, support, and own the music. Choose{" "}
              <span className="text-white">Albums</span> or{" "}
              <span className="text-white">Songs</span>, then hit{" "}
              <span className="text-white">Buy</span> to go straight to
              checkout.
            </p>

            {/* View toggle */}
            <div className="inline-flex bg-white/5 backdrop-blur mt-8 p-1 border border-white/10 rounded-2xl">
              <ToggleButton
                active={view === "albums"}
                onClick={() => setView("albums")}
                label="Albums"
              />
              <ToggleButton
                active={view === "songs"}
                onClick={() => setView("songs")}
                label="Songs"
              />
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="z-10 relative">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-28 w-full max-w-7xl">
            <div
              ref={gridRef}
              className="justify-items-center gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {data.map((item, idx) => (
                <MediaCard
                  key={(item.title || "item") + idx}
                  item={item}
                  kind={view} // 'albums' | 'songs'
                  onListen={() => setOpenEmbed(item)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Listen Modal (optional) */}
        {openEmbed && openEmbed.embedUrl && (
          <Modal onClose={() => setOpenEmbed(null)} title={openEmbed.title}>
            <div className="bg-black border border-white/10 rounded-xl w-full aspect-video overflow-hidden">
              <iframe
                title={`${openEmbed.title} player`}
                src={openEmbed.embedUrl}
                className="w-full h-full"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              />
            </div>
          </Modal>
        )}
      </main>

      <Footer isMobile={isMobile} />
    </>
  )
}

// ---------- Components ----------

function ToggleButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400",
        active
          ? "bg-fuchsia-500/15 text-fuchsia-300"
          : "text-white/80 hover:bg-white/10",
      ].join(" ")}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

function MediaCard({ item, kind, onListen }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const img = el.querySelector("img")

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const rx = ((y - rect.height / 2) / rect.height) * -8
      const ry = ((x - rect.width / 2) / rect.width) * 8
      gsap.to(el, {
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 800,
        duration: 0.25,
      })
      gsap.to(img, { y: -6, duration: 0.25 })
    }
    const onLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.35,
        ease: "power3.out",
      })
      gsap.to(img, { y: 0, duration: 0.35, ease: "power3.out" })
    }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  // === NEW: determine if this item should be marked unavailable ===
  // Compare exact title string per your request.
  const isUnavailable =
    typeof item.title === "string" &&
    item.title.trim() === "Me And All My Demons"

  return (
    <article
      ref={cardRef}
      className="group relative bg-white/5 hover:shadow-[0_10px_40px_rgba(255,0,255,0.15)] backdrop-blur mx-auto p-3 border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden transition-shadow media-card"
    >
      <div className="relative bg-black rounded-xl w-full aspect-square overflow-hidden">
        <img
          src={item.cover}
          alt={`${item.title} cover art`}
          className="w-full h-full object-center object-cover transition-transform duration-300 will-change-transform"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-all translate-x-[-120%] group-hover:translate-x-[120%] duration-700 pointer-events-none" />
      </div>

      <div className="flex justify-between items-start gap-3 mt-4">
        <div className="min-w-0">
          <h3
            className="font-semibold text-base truncate leading-tight"
            title={item.title}
          >
            {item.title}
          </h3>
          <div className="mt-0.5 text-white/60 text-sm">
            {item.year}
            {kind === "songs" && item.albumTitle && (
              <>
                {" · "}
                <a
                  className="hover:underline underline-offset-4"
                  href={item.albumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.albumTitle}
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {/* If the item is unavailable (exact album title), show a disabled 'Not available' button */}
        {isUnavailable ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Not available"
            className="inline-flex flex-1 justify-center items-center gap-2 bg-white/6 px-4 py-2 border border-white/10 rounded-xl font-semibold text-white/40 text-sm cursor-not-allowed"
          >
            Not available
          </button>
        ) : (
          // Default Buy link (kept as anchor if purchaseUrl exists, otherwise render a disabled fallback)
          item.purchaseUrl ? (
            <a
              href={item.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 justify-center items-center gap-2 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 px-4 py-2 border border-fuchsia-500/40 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 font-semibold text-fuchsia-300 text-sm transition"
            >
              Buy
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex flex-1 justify-center items-center gap-2 bg-white/6 px-4 py-2 border border-white/10 rounded-xl font-semibold text-white/40 text-sm cursor-not-allowed"
            >
              Not available
            </button>
          )
        )}

        {item.embedUrl && (
          <button
            type="button"
            onClick={onListen}
            className="inline-flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 border border-white/15 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 font-medium text-white/90 text-sm transition"
          >
            Listen
          </button>
        )}

        {kind === "songs" && item.albumUrl && (
          <a
            href={item.albumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 border border-white/15 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 font-medium text-white/90 text-sm transition"
          >
            Album
          </a>
        )}
      </div>
    </article>
  )
}

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="z-[60] fixed inset-0 flex justify-center items-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="z-[61] relative bg-neutral-950 shadow-2xl p-4 border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden">
        <div className="flex justify-between items-center gap-4 mb-3">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="bg-white/5 hover:bg-white/10 px-3 py-1.5 border border-white/15 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 text-white/80 text-sm transition"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
