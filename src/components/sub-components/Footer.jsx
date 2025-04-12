const Footer = () => {
  return (
    <section id="footer">
      <footer className="bg-black p-4 w-full text-white text-center">
        <p>
          &copy; {new Date().getFullYear()} Jawfane Band. All rights reserved.
        </p>
        <p>
          <span>Website Designed by:</span>
          <a
            className="ml-1 font-extrabold text-rose-700"
            href="https://infinitepixel.dev"
          >
            Infinite Pixel
            {/* InfinitePixel logo */}
            <img
              src="https://infinitepixel.dev/images/logo.svg"
              alt="Infinite Pixel Logo"
              className="inline-block ml-2 w-12 h-12"
            />
          </a>
        </p>
      </footer>
    </section>
  );
};

export default Footer;
