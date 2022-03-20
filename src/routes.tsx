import { Outlet, ReactLocation, Route, Router } from "@tanstack/react-location";

const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*.tsx");

const regularRoutes: Route[] = Object.keys(ROUTES).map((key) => {
  const route = ROUTES[key];
  const path = key
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  return {
    path,
    element: () =>
      route().then((mod) =>
        mod?.default ? <mod.default /> : "Nothing exported."
      ),
    loader: (...args) => route().then((mod) => mod?.loader?.(...args)),
  };
});

const location = new ReactLocation();
const routes = [...regularRoutes];

export const Routes = () => {
  return (
    <Router location={location} routes={routes}>
      <Outlet />
    </Router>
  );
};
