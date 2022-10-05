import { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import { checkAuthenticated, load_user, refreshToken } from "../actions/auth";

const Layout = (props) => {
  useEffect(() => {
    props.refreshToken();
    props.checkAuthenticated();
    props.load_user();
  }, [props]);

  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user, refreshToken })(
  Layout
);
