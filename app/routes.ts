import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layouts/home.tsx", [index("routes/home/index.tsx")]),
  layout("./routes/layouts/main.tsx", [
    route("about", "./routes/about/index.tsx"),
    route("contact", "./routes/contact/index.tsx"),
    route("blog", "./routes/blog/index.tsx"),
    route("blog/:slug", "./routes/blog/detail.tsx"),
    route("*", "./routes/errors/not-found.tsx"),
  ]),
] satisfies RouteConfig;