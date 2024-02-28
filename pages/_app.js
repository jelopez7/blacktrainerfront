import React, { useEffect } from "react";
import "../SCSS/global.scss";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { store } from "../store/store";
import { startChecking } from "../actions/auth";
import ReactGA from "react-ga4";
import "react-calendar/dist/Calendar.css";

const TRACKING_ID = "G-RZJKH11MDZ";
ReactGA.initialize(TRACKING_ID);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Dispatch>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
        </Dispatch>
      </Provider>
    </>
  );
}

export default MyApp;

function Dispatch({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, []);

  return <>{children}</>;
}
