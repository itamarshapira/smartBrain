import React, { useState } from "react";
import "./SignIn.css";
import backendUrl from "../../config";

import SignInLogo from "./SignInLogo";
import Loading from "../Loading/Loading";
//sigin

function SignIn({
  onRouteChange,
  user,
  onUserUpdate,
  setIsLoading,
  isLoading,
}) {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [loadingMessage, setLoadingMessage] = useState(""); // New state for additional loading message

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true); // Show loading spinner

    // setLoadingMessage(""); // Reset the message when loading starts
    // // Trigger message after 5 seconds
    // setTimeout(() => {
    //   setLoadingMessage("Yep, it's still loading...");
    // }, 5000);

    if (!email || !password) {
      alert("Please fill out both fields.");
      setIsLoading(false); // Hide loading spinner if validation fails
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/signIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        mode: "cors", // Ensure that CORS is handled
      });

      const data = await response.json();
      if (response.ok) {
        onUserUpdate({
          name: data.name, // Assuming your backend returns the user's name
          email: email,
          detectionCounter: data.detectionCounter, // Assuming your backend returns detectionCounter
        });
        console.log("Login successful:", data);
        onRouteChange("home"); // Navigate to home page on successful login
      } else {
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Hide loading spinner once the request is complete
      // setLoadingMessage(""); // Reset the message when loading finishes
    }
  };

  return (
    <div className="logo">
      <article className="glass br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={handleSubmit}>
            <div className="measure">
              {/* Display loading spinner when isLoading is true */}
              {isLoading && <Loading />}

              {/* {loadingMessage && <p>{loadingMessage}</p>}
              Display the additional loading message */}
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <SignInLogo />
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    value={email}
                    onChange={onEmailChange} // Capture email input
                    required
                    placeholder="email@example123.com"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onPasswordChange} // Capture password input
                    required
                    minLength={3}
                    placeholder="password"
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  //onClick={handleSubmit} // Trigger form submission
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  onClick={() => onRouteChange("register")}
                  className="f6 link dim black db pointer"
                >
                  Register
                </p>
              </div>
            </div>
          </form>
        </main>
      </article>
    </div>
  );
}

export default SignIn;
