import FrontPage from "../../pages/FrontPage/Front";
import VieweArtboard from "../../pages/VieweArtboard/VieweArtboard";
import Artboard from "../../pages/Artboard/Artboard";
import App from "../../pages/App/App";

const Routes = [
  {
    id: 1,
    name: "VieweArtboard",
    path: "/VieweArtboard",
    exact: false,
    Component: VieweArtboard,
  },
  {
    id: 3,
    name: "Artboard",
    path: "/Artboard/:id",
    exact: false,
    Component: Artboard,
  },
  {
    id: 4,
    name: "App",
    path: "/App/:id",
    exact: false,
    Component: App,
  },
  {
    id: 5,
    name: "App",
    path: "/App",
    exact: false,
    Component: App,
  },
  {
    id: 2,
    name: "FrontPage",
    path: "/",
    exact: true,
    Component: FrontPage,
  },
];

export { Routes };
