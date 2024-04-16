import { Fragment } from "react";
import ContexApi from "~/hook/context/Defaultcontextapi";

function BlankLayout({ children }) {
  return (
    <Fragment>
      <ContexApi>{children}</ContexApi>
    </Fragment>
  );
}
export default BlankLayout;
