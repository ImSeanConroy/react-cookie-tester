import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import "./Cookie.css";
import CookieConsent, {
  getCookieConsentValue,
  Cookies,
} from "react-cookie-consent";

function Cookie() {
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

  const [isCookieVisible, setCookieVisible] = useState("false");
  const ToggleClass = () => {
    setCookieVisible(!isCookieVisible);
  };

  return (
    <div>
      <CookieConsent
        cookieName="_Cc"
        location="top"
        buttonText="Accept All"
        declineButtonText="Reject All"
        debug={true}
        enableDeclineButton
        onAccept={handleAcceptCookie}
        onDecline={handleDeclineCookie}
        style={{
          color: "#212529",
          backgroundColor: "#fff",
        }}
        buttonStyle={{
          padding: "9px 65px",
          marginTop: "0",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#343a40",
          borderRadius: "5px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#212529",
        }}
        declineButtonStyle={{
          padding: "9px 65px",
          marginTop: "0",
          color: "#212529",
          backgroundColor: "#fff",
          borderRadius: "5px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#212529",
        }}
        contentClasses={{ color: "red" }}
      >
        <h3>We value your privacy</h3>
        <p style={{ marginBottom: "12px" }}>
          We use essential cookies to make our site work. With your consent, we
          may also use Analytical cookies to analyse our traffic. These cookies
          help provide information on metrics such as the number of visitors,
          bounce rate, traffic source. By clicking "Accept All", you consent to
          our use of cookies as described in our{" "}
          <a href="/cookie-policy">Cookie Policy</a>.
        </p>

        <span onClick={ToggleClass}>
          View the specific cookies we use &darr;
        </span>
        <ul className={isCookieVisible ? "null" : "active"}>
          <li style={{ marginBottom: "8px" }}>
            <strong>_ga:</strong> Used to distingush users (expires after 2
            years)
          </li>
          <li style={{ marginBottom: "8px" }}>
            <strong>_gid:</strong> Used to distingush users (expires after 25
            hours)
          </li>
          <li style={{ marginBottom: "8px" }}>
            <strong>_gat:</strong> Used to throttle request rate (expires after
            1 minute)
          </li>
          <li style={{ marginBottom: "8px" }}>
            <strong>_ga_QJ980VLFFN:</strong> Unique ID that makes Google
            Analytics work (expires after 90 days)
          </li>
          <li>
            <strong>_Cc:</strong> Used to track whether the user has agreed to
            Analytical cookies (expires after 365 days)
          </li>
        </ul>
      </CookieConsent>
    </div>
  );
}

export default Cookie;
