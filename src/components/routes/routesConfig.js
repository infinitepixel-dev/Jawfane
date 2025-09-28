import { lazy } from "react"

export const navigationRoutes = [
  { id: "n1", name: "home", label: "Home" },
  { id: "n3", name: "album", label: "Album" },
  { id: "n4", name: "tour", label: "Tour" },
  { id: "n5", name: "merch", label: "Merch" },
  { id: "n6", name: "lore", label: "Lore" },
  { id: "n7", name: "music", label: "Music" },
  { id: "n8", name: "booking", label: "Booking" },
  { id: "n9", name: "buy-music", label: "Buy Music" }, // cleaned name
]

export const componentRoutes = [
  {
    id: "home",
    key: "a1",
    path: "/",
    componentPath: "../pages/Home.jsx",
    metaData: {
      title: "Jawfane Band",
      description: "Official website of Jawfane Band",
      keywords: "jawfane, band, music, tour, merch",
    },
  },
  {
    id: "album",
    key: "a2",
    path: "/album",
    componentPath: "../sub-components/AlbumArtGallery.jsx",
    metaData: {
      title: "Cataclysm Nightmare",
      description: "Explore the latest album from Jawfane.",
      keywords: "album, Jawfane, music, metal, rock",
    },
  },
  {
    id: "tour",
    key: "a3",
    path: "/tour",
    componentPath: "../pages/Tour.jsx",
    metaData: {
      title: "Tour Dates",
      description: "Check out our upcoming tour dates",
      keywords: "tour, dates, band, jawfane",
    },
  },
  {
    id: "merch",
    key: "a4",
    path: "/merch",
    componentPath: "../pages/Merch.jsx",
    metaData: {
      title: "Jawfane Band",
      description: "Find Jawfane Merch",
      keywords: "jawfane, band, music, tour, merch",
    },
  },
  {
    id: "lore",
    key: "a5",
    path: "/lore",
    componentPath: "../pages/Lore.jsx",
    metaData: {
      title: "Jawfane Lore",
      description:
        "Uncover the hidden stories and secrets behind Jawfane's music.",
      keywords: "Jawfane, lore, music, metal",
    },
  },
  {
    id: "music",
    key: "a6",
    path: "/music",
    componentPath: "../pages/MusicVideos.jsx",
    metaData: {
      title: "Music Videos",
      description: "Watch our latest music videos",
      keywords: "music, videos, band, jawfane",
    },
  },
  {
    id: "booking",
    key: "a7",
    path: "/booking",
    componentPath: "../pages/Booking.jsx",
    metaData: {
      title: "Book Jawfane",
      description:
        "Bring Jawfane to your event. Book the band for an unforgettable performance.",
      keywords:
        "book Jawfane, live performance, metal band, concert, music booking, event",
    },
  },
  {
    id: "buy-music",
    key: "a8",
    path: "/buy-music",
    componentPath: "../pages/BuyJawfane.jsx",
    metaData: {
      title: "Buy Music",
      description: "Purchase Jawfane's music from various platforms",
      keywords: "buy music, Jawfane, band, albums, singles",
    },
  },
]

let RoutesWithComponents = componentRoutes

if (typeof window !== "undefined") {
  const componentMap = import.meta.glob("../pages/*.{jsx,js}")
  const components = {}

  componentRoutes.forEach((route) => {
    const importPath = route.componentPath
    if (componentMap[importPath]) {
      components[route.key] = lazy(componentMap[importPath])
    } else {
      console.warn(`Component for path ${importPath} not found.`)
    }
  })

  RoutesWithComponents = componentRoutes.map((route) => ({
    ...route,
    component: components[route.key],
  }))
}

export default RoutesWithComponents
