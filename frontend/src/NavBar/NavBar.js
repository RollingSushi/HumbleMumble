import React from "react";
import { Link, withRouter } from "react-router-dom";
import auth0Client from "../Auth";

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace("/");
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top" id="navbar">
      <Link className="navbar-brand" to="/">
        <img
          src={process.env.PUBLIC_URL + "/MH.png"}
          alt="HumbleMumble"
          id={props.name}
        />
        HumbleMumble
      </Link>
      <Link to="/">Home</Link>
      <Link to="/Account">My Account</Link>
      <Link to="/Movie">Movie</Link>
      <Link to="/Game">Game</Link>
      <Link to="/Tv-Show">Tv-Show</Link>
      {!auth0Client.isAuthenticated() && (
        <button className="btn btn-dark" onClick={auth0Client.signIn}>
          Sign In
        </button>
      )}
      {auth0Client.isAuthenticated() && (
        <div>
          <label className="mr-2 text-white">
            {auth0Client.getProfile().name}
          </label>
          <button
            className="btn btn-dark"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default withRouter(NavBar);
