import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { publicroutes } from "./Routers/index";
import { DefaultLayout } from "./layouts";
import BlankLayout from "./layouts/BlankLayout/BlankLayout";
import SearchContexApi from "./hook/context/SearchContex";

window.onload = () => {
  // khi windown refes thì đăt lại là true
  config.ismute = true;
};

// //local
const savelocal = "Tiktok";

export const config = JSON.parse(localStorage.getItem(savelocal)) || {};
export const setconfig = (key, Value) => {
  config[key] = Value;
  localStorage.setItem(savelocal, JSON.stringify(config));
};
setconfig("ismute", true); //muted
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicroutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = BlankLayout;
            } else if (route.nopage) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
