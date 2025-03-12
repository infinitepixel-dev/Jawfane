// routesConfig.js

// import Booking from "@components/pages/Booking";

import { lazy } from "react"

// routesConfig.js
export const navigationRoutes = [
  { id: "n1", name: "home", label: "Home" },
  { id: "n2", name: "album", label: "Album" },
  { id: "n3", name: "tour", label: "Tour" },
  { id: "n4", name: "lore", label: "Lore" },
  { id: "n5", name: "music", label: "Music" },
  { id: "n6", name: "booking", label: "Booking" },
]

//INFO export

export const componentRoutes = [
  {
    id: "a1",
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
    componentPath: "../pages/AlbumArtGallery.jsx",
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
    id: "lore",
    key: "a4",
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
    key: "a5",
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
    key: "a6",
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
]

let RoutesWithComponents = componentRoutes

if (typeof window !== "undefined") {
  // Vite-specific logic for dynamic imports
  const componentMap = import.meta.glob("../pages/*.{jsx,js}")

  //INFO Sub components path
  // const subComponentMap = import.meta.glob(
  //   "../components/Sub_Components/**/*.{jsx,js}"
  // );
  /* console.log('Component Map:', { ...componentMap, ...subComponentMap }) */

  // Initialize the components object
  const components = {}

  // Define required meta fields
  const requiredMetaFields = [
    // "title", // SEO: Page title
    // "description", // SEO: Meta description
    // "og:title", // Social: Open Graph title
    // "og:description", // Social: Open Graph description
    // "og:image", // Social: Open Graph image
    // "og:url", // Social: Canonical URL for Open Graph
    // "twitter:title", // Social: Twitter title
    // "twitter:description", // Social: Twitter description
    // "twitter:image", // Social: Twitter image
    // "path", // Route Path
    // "layout", // Layout to use for rendering
    // "requiresAuth", // Whether authentication is required
    // "roles", // Roles allowed to access
    // "breadcrumbs", // Breadcrumb navigation information
  ]

  // Adjust componentPath if necessary to match the keys in componentMap
  componentRoutes.forEach((route) => {
    // console.log("Route:", route);

    const importPath = route.componentPath
    let componentPromise = null

    if (componentMap[importPath]) {
      componentPromise = componentMap[importPath]()
      components[route.key] = lazy(componentMap[importPath])

      // console.log("Components:", components);
    }
    //INFO Sub components path
    // else if (subComponentMap[importPath]) {
    //   componentPromise = subComponentMap[importPath]();
    //   components[route.key] = lazy(subComponentMap[importPath]);
    // }

    //INFO Else if the component is not found, log a warning
    else {
      console.warn(`Component for path ${importPath} not found.`)
    }

    // If the component was found, check for meta information
    if (componentPromise) {
      componentPromise.then((componentModule) => {
        const component = componentModule.default
        const meta = component?.meta || {}
        requiredMetaFields.forEach((field) => {
          if (!meta[field]) {
            /*      console.warn(
                            `Meta field "${field}" is missing in component for path ${importPath}`
                        ) */
          }
        })
      })
    }
  })

  // Create RoutesWithComponents array
  RoutesWithComponents = componentRoutes.map((route) => ({
    ...route,
    component: components[route.key],
  }))
}

// console.log("Routes with Components:", RoutesWithComponents);

export default RoutesWithComponents
