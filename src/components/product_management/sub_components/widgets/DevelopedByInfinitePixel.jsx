//DevelopedByInfinitePixel.jsx

//INFO Images
import ip_logo from "@assets_product_management/images/ip_logo.png";

function DevelopedByInfinitePixel() {
  return (
    <>
      <a
        //TODO uncomment this line one the website is live
        // href="https://infinitepixel.dev"
        target="_blank"
        rel="noreferrer"
        className="relative top-0"
      >
        <img src={ip_logo} alt="Infinite Pixel LLC Logo" />
      </a>
      <span className="absolute bottom-0 text-center text-xs p-2">
        Developed By: Infinite Pixel
      </span>
    </>
  );
}

export default DevelopedByInfinitePixel;
