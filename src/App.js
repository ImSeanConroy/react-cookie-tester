import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import ReactGA from "react-ga4";
import CookieConsent, {
  getCookieConsentValue,
  Cookies,
} from "react-cookie-consent";

function App() {
  const handleAcceptCookie = () => {
    ReactGA.initialize(process.env.REACT_APP_GA_ID);
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });
  };

  const handleDeclineCookie = () => {
    //remove google analytics cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };

  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      handleAcceptCookie();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <CookieConsent
        debug={true}
        enableDeclineButton
        onAccept={handleAcceptCookie}
        onDecline={handleDeclineCookie}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  );
}

export default App;
