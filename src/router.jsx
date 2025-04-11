// router.jsx

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "./RootLayout";

//INFO Pages
import Home from "./components/pages/Home";
import Tour from "./components/pages/Tour";
import Music from "./components/pages/MusicVideos";
import Booking from "./components/pages/Booking";

// These get passed to routes from RootLayout via function
const withProps = (Component, props) => <Component {...props} />;

export const createAppRouter = (layoutProps) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout {...layoutProps} />}>
        <Route index element={withProps(Home, layoutProps)} />
        <Route path="home" element={withProps(Home, layoutProps)} />
        <Route path="tour" element={withProps(Tour, layoutProps)} />
        <Route path="music" element={withProps(Music, layoutProps)} />
        <Route path="booking" element={withProps(Booking, layoutProps)} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );
