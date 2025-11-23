import PropTypes from "prop-types"

const Footer = ({ isMobile }) => {
  return (
    <section id="footer" className="bg-black py-12 text-white">
      <footer className="gap-12 grid grid-cols-1 md:grid-cols-3 mx-auto px-6 max-w-7xl md:text-left text-center">
        {/* Find Our Music */}
        <div>
          <h3 className="mb-4 font-bold text-xl">Find Our Music</h3>
          <ul className="space-y-2 text-gray-300">
            {[
              {
                name: "Apple Music",
                url: "https://music.apple.com/us/artist/jawfane/1582900055",
              },
              {
                name: "Spotify",
                url: "https://open.spotify.com/artist/04PGz4v6rpnz9nns2y0Awq?si=ER6fqrRHT1mcjrtcfcXguA",
              },
              {
                name: "Amazon Music",
                url: "https://music.amazon.com/artists/B09DNTY4B3/jawfane",
              },
              {
                name: "Deezer",
                url: "https://www.deezer.com/en/artist/143517472",
              },
              { name: "Bandcamp", url: "https://jawfane.bandcamp.com/" },
            ].map(({ name, url }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition"
                  aria-label={`Visit Jawfane on ${name}`}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="mb-4 font-bold text-xl">Follow Us</h3>
          <ul className="space-y-2 text-gray-300">
            {[
              { name: "Blog", url: "https://jawfane.blogspot.com/" },
              { name: "Facebook", url: "https://www.facebook.com/Jawfane" },
              { name: "Twitter", url: "https://twitter.com" },
              { name: "Instagram", url: "https://instagram.com/jawfane" },
              { name: "TikTok", url: "https://tiktok.com/@jawfane" },
              { name: "Bandcamp", url: "https://jawfane.bandcamp.com/" },
            ].map(({ name, url }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition"
                  aria-label={`Visit Jawfane on ${name}`}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright & Credit */}
        <div className="flex flex-col items-center md:items-start">
          <p className="mb-2 text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Jawfane. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Website by{" "}
            <a
              href="https://infinitepixel.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Infinite Pixel"
              className="inline-flex items-center font-bold text-rose-500 hover:underline"
            >
              Infinite Pixel
              <img
                src="https://infinitepixel.dev/images/logo.svg"
                alt="Infinite Pixel Logo"
                className="ml-2 w-6 h-6"
              />
            </a>
          </p>
        </div>
      </footer>
    </section>
  )
}

Footer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default Footer
