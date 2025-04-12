import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Apple, AudioLines, ChevronLeft, ChevronRight } from "lucide-react";

const MusicMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRefs = useRef([]);

  useEffect(() => {
    gsap.to(menuRef.current, {
      x: isOpen ? 0 : 128,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(buttonRef.current, {
      x: isOpen ? 0 : 45,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isOpen]);

  const handleHover = (el) => {
    if (el) gsap.to(el, { scale: 1.3, duration: 0.2, ease: "power2.out" });
  };

  const handleLeave = (el) => {
    if (el) gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  const handleClick = (el) => {
    if (el) {
      gsap.fromTo(
        el,
        { scale: 1 },
        { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 }
      );
    }
  };

  return (
    <div className="top-1/2 right-0 z-10 fixed flex items-center -translate-y-1/2">
      {/* Toggle button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="z-50 bg-slate-200 p-1 rounded-full text-slate-800"
      >
        {isOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Sliding menu */}
      <div
        ref={menuRef}
        className="flex flex-col items-center gap-6 bg-slate-200 shadow-lg ml-[-10px] px-4 py-6 rounded-l-2xl w-25 text-slate-800"
      >
        {[
          {
            href: "https://open.spotify.com/artist/04PGz4v6rpnz9nns2y0Awq?si=ER6fqrRHT1mcjrtcfcXguA",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.6.5.5 5.6.5 12S5.6 23.5 12 23.5 23.5 18.4 23.5 12 18.4.5 12 .5Zm5.1 16.8c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.9-9.3-1.1-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 4-.9 7.4-.5 10.2 1.2.3.2.4.6.4.9Zm1.3-3.1c-.3.4-.7.5-1.1.3-2.8-1.7-7.1-2.2-10.5-1.3-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.9-1 8.6-.4 11.9 1.5.5.2.6.7.4 1.1Zm.1-3.3c-3.3-2-8.8-2.2-12-.7-.5.2-1.1 0-1.3-.5-.2-.5 0-1.1.5-1.3 3.7-1.6 9.9-1.3 13.6.9.5.3.6.9.3 1.4-.3.4-.9.5-1.1.2Z" />
              </svg>
            ),
            color: "hover:text-green-400",
          },
          {
            href: "https://music.apple.com/us/artist/jawfane/1582900055",
            icon: <Apple />,
            color: "hover:text-pink-400",
          },
          {
            href: "https://www.deezer.com/en/artist/143517472",
            icon: <AudioLines />,
            color: "hover:text-purple-400",
          },
          {
            href: "https://music.amazon.com/artists/B09DNTY4B3/jawfane",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.27 13.36c0-.45.37-.82.82-.82h7.45c.45 0 .82.37.82.82s-.37.82-.82.82h-7.45a.83.83 0 0 1-.82-.82Zm6.26 2.45c.2-.38.68-.53 1.06-.32.38.2.53.68.32 1.06a8.47 8.47 0 0 1-14.13 1.03.75.75 0 0 1 1.1-1.02 6.98 6.98 0 0 0 11.65-0.75Zm-7.84-5.33c0-.45.37-.82.82-.82h3.27c.45 0 .82.37.82.82s-.37.82-.82.82h-3.27a.82.82 0 0 1-.82-.82Zm.55-4.2 6.77-1.77v7.44c-.3-.11-.62-.18-.95-.18h-.3v-5.2l-4.46 1.16v5.57c-.3-.1-.62-.15-.95-.15h-.3v-6.87Zm-7.22.3c-.07-.43-.5-.72-.93-.64-.43.07-.72.5-.64.93l1.06 6.65c.12.73.77 1.26 1.52 1.26h1.06v-2.05h.53c.92 0 1.67-.75 1.67-1.67v-2.42c0-.92-.75-1.67-1.67-1.67h-2.6Zm1.9 3.85h-.68l-.38-2.37h1.06v2.37Zm3.87 3.52c.55 0 1-.45 1-1V6.37c0-.55-.45-1-1-1s-1 .45-1 1v6.67c0 .55.45 1 1 1Z" />
              </svg>
            ),
            color: "hover:text-yellow-400",
          },
        ].map((item, index) => (
          <a
            key={index}
            href={item.href}
            ref={(el) => (iconRefs.current[index] = el)}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${item.color}`}
            onMouseEnter={() => handleHover(iconRefs.current[index])}
            onMouseLeave={() => handleLeave(iconRefs.current[index])}
            onClick={() => handleClick(iconRefs.current[index])}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MusicMenu;
