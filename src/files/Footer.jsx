const Footer = () => {
  return (
    <>
      <section id="footer">
        <footer className="bg-black text-white p-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Jawfane Band. All rights reserved.
          </p>
        </footer>
      </section>
    </>
  );
};

export default Footer;
