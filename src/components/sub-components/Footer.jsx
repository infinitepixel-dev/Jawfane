const Footer = () => {
  return (
    <>
      <section id="footer">
        <footer className="relative w-full p-4 text-center text-white bg-black">
          <p>
            &copy; {new Date().getFullYear()} Jawfane Band. All rights reserved.
          </p>
          <p>
            Website Designed by:
            <a href="https://infinitepixel.dev"> Infinite Pixel</a>
          </p>
        </footer>
      </section>
    </>
  )
}

export default Footer
