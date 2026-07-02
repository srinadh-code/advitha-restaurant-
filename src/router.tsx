// import { QueryClient } from "@tanstack/react-query";
// import { createRouter } from "@tanstack/react-router";
// import { routeTree } from "./routeTree.gen";

// export const getRouter = () => {
//   const queryClient = new QueryClient();

//   const router = createRouter({
//     routeTree,
//     context: { queryClient },
//     scrollRestoration: true,
//     defaultPreloadStaleTime: 0,
//   });

//   return router;
// };

import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// ✅ Add this here
let router: ReturnType<typeof createRouter>;

export const getRouter = () => {
  // ✅ Add this condition
  if (!router) {
    const queryClient = new QueryClient();

    router = createRouter({
      routeTree,
      context: { queryClient },
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,
    });
  }

  return router;
};