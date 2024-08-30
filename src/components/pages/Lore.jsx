import React from "react"

function Lore() {
  return (
    <div
      className="flex min-h-screen overflow-hidden text-2xl font-light bg-gray-300"
      id="lore"
    >
      {/* Panel 1 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-no-repeat bg-center bg-cover text-center text-white relative bg-[url('https://www.wallpaperflare.com/static/454/254/349/rock-stars-concerts-guitar-mark-tremonti-wallpaper.jpg')] transition-all duration-500 ease-in-out hover:flex-[5] hover:before:bg-black/80">
        <h1 className="hidden text-3xl text-maroon-600 text-shadow-md hover:block">
          Alterbridge
        </h1>
        <p className="uppercase font-light text-lg md:text-3xl text-shadow-sm transform translate-y-[100%] transition-transform duration-500 hover:translate-y-0">
          Mark Tremonti
        </p>
      </div>

      {/* Panel 2 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-no-repeat bg-center bg-cover text-center text-white relative bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/df/Dreamtheater_-_Wacken_Open_Air_2015-1619_%28cropped%29.jpg')] transition-all duration-500 ease-in-out hover:flex-[5] hover:before:bg-black/80">
        <h1 className="hidden text-3xl text-white text-shadow-md hover:block">
          Dream Theater
        </h1>
        <p className="uppercase font-light text-lg md:text-3xl text-shadow-sm transform translate-y-[100%] transition-transform duration-500 hover:translate-y-0">
          John Petrucci
        </p>
      </div>

      {/* Panel 3 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-no-repeat bg-center bg-cover text-center text-white relative bg-[url('https://townsquare.media/site/366/files/2023/06/attachment-pantera_dimebag_darrell.jpg?w=1080&q=75')] transition-all duration-500 ease-in-out hover:flex-[5] hover:before:bg-black/80">
        <h1 className="hidden text-3xl text-burnt-orange-600 text-shadow-md hover:block">
          Pantera
        </h1>
        <p className="uppercase font-light text-lg md:text-3xl text-shadow-sm transform translate-y-[100%] transition-transform duration-500 hover:translate-y-0">
          Dimebag Darrell
        </p>
      </div>

      {/* Panel 4 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-no-repeat bg-center bg-cover text-center text-white relative bg-[url('https://cdn-p.smehost.net/sites/7f9737f2506941499994d771a29ad47a/wp-content/uploads/2020/02/JCB_Periphery_2757.jpg')] transition-all duration-500 ease-in-out hover:flex-[5] hover:before:bg-black/80">
        <h1 className="hidden text-3xl text-yellow-600 text-shadow-md hover:block">
          Periphery
        </h1>
        <p className="uppercase font-light text-lg md:text-3xl text-shadow-sm transform translate-y-[100%] transition-transform duration-500 hover:translate-y-0">
          Misha Mansoor
        </p>
      </div>

      {/* Panel 5 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-no-repeat bg-center bg-cover text-center text-white relative bg-[url('https://townsquare.media/site/366/files/2017/02/Zakk-Wylde-Ozzy-Osbourne.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89')] transition-all duration-500 ease-in-out hover:flex-[5] hover:before:bg-black/80">
        <h1 className="hidden text-3xl text-black text-shadow-lg hover:block">
          Black Label Society
        </h1>
        <p className="uppercase font-light text-lg md:text-3xl text-shadow-sm transform translate-y-[100%] transition-transform duration-500 hover:translate-y-0">
          Zakk Wylde
        </p>
      </div>
    </div>
  )
}

export default Lore
