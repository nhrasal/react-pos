import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./@pages/Layouts/Layout";
import NotFound from "./@pages/NotFound";
import RouterList, { IRouterList } from "./routeList";

export const Router = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Routers, setRouters] = React.useState(RouterList);

  useEffect(() => {
    setRouters(RouterList);
  }, []);

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>loading..</p>}>
          <Routes>
            {Routers.length &&
              Routers.map((route: IRouterList, index: number) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.component></route.component>}
                  />
                );
              })}
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
};
