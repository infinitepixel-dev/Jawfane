const Footer = () => {
  return (
    <>
      <section id="footer">
        {/* REVIEW temporary mt-64 for effect... */}
        <footer className="relative w-full mt-64 p-4 text-center text-white bg-black">
          <p>
            &copy; {new Date().getFullYear()} Jawfane Band. All rights reserved.
          </p>
        </footer>
      </section>
    </>
  );
};

export default Footer;
