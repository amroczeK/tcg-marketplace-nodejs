import { routers } from "../routes";
import { Express } from "express";

const routes = [
  {
    path: "/cards",
    router: routers.CardsRouter,
  },
];

export const setupRouting = (app: Express) => {
  console.log("Setting up routing.");
  routes.forEach((route) => {
    console.log(`/api${route.path}`);
    app.use(`/api${route.path}`, route.router);
  });
};
