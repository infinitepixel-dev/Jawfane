import PropTypes from "prop-types"

const footerPropTypes = {
  isMobile: PropTypes.bool.isRequired,
}

const Footer = ({ isMobile }) => {
  console.log(isMobile, "this is isMobile")

  return (
    <section id="footer">
      <footer className="w-full p-8 text-white bg-black">
        <div className="flex flex-col items-center justify-center gap-12 text-center md:gap-52 md:items-start md:flex-row md:text-left">
          {/* Column 1: Find Our Music */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Find Our Music</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://music.apple.com/us/artist/jawfane/1582900055"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apple Music
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/artist/04PGz4v6rpnz9nns2y0Awq?si=ER6fqrRHT1mcjrtcfcXguA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spotify
                </a>
              </li>
              <li>
                <a
                  href="https://music.apple.com/us/artist/jawfane/1582900055"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Amazon Music
                </a>
              </li>
              <li>
                <a
                  href="https://www.deezer.com/en/artist/143517472"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Deezer
                </a>
              </li>
            </ul>
          </div>
          {isMobile ? (
            <div>
              <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.facebook.com/Jawfane"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/jawfane"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com/@jawfane"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://jawfane.bandcamp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bandcamp
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-center ">
              <p>
                &copy; {new Date().getFullYear()} Jawfane Band. All rights
                reserved.
              </p>
              <p>
                <span>Website Designed by:</span>
                <a
                  className="inline-flex items-center ml-1 font-extrabold text-rose-700"
                  href="https://infinitepixel.dev"
                >
                  Infinite Pixel
                  <img
                    src="https://infinitepixel.dev/images/logo.svg"
                    alt="Infinite Pixel Logo"
                    className="w-8 h-8 ml-2"
                  />
                </a>
              </p>
            </div>
          )}
          {/* swapping order of columns */}
          {isMobile ? (
            <div className="mt-8 text-center">
              <p>
                &copy; {new Date().getFullYear()} Jawfane Band. All rights
                reserved.
              </p>
              <p>
                <span>Website Designed by:</span>
                <a
                  className="inline-flex items-center ml-1 font-extrabold text-rose-700"
                  href="https://infinitepixel.dev"
                >
                  Infinite Pixel
                  <img
                    src="https://infinitepixel.dev/images/logo.svg"
                    alt="Infinite Pixel Logo"
                    className="w-8 h-8 ml-2"
                  />
                </a>
              </p>
            </div>
          ) : (
            <div>
              <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.facebook.com/Jawfane"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/jawfane"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com/@jawfane"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://jawfane.bandcamp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bandcamp
                  </a>
                </li>
              </ul>
            </div>
          )}
          {/* swapping order of columns */}
        </div>
      </footer>
    </section>
  )
}

Footer.propTypes = footerPropTypes

export default Footer
