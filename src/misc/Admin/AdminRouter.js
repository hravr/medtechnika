import React, { lazy } from "react";
import { Route } from "react-router-dom";

const Admin = lazy(() => import("../../pages/Admin/Admin"));
const EditOrder = lazy(() => import("../../pages/EditNews/EditNews"));
const EditNews = lazy(() => import("../../pages/EditOrder/EditOrder"));

const AdminRouter = () => {
  return (
    <>
      <Route path="/admin" component={() => <Admin />} />
      <Route path="/edit-order/:id" component={() => <EditOrder />} />
      <Route path="/edit-news/:id" component={() => <EditNews />} />
    </>
  );
};

export default AdminRouter;
