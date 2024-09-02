import React, { useState } from "react";
import "./Register.css";
function Register({ onRouteChange, user, onUserUpdate }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  // Handle name change
  const onNameChange = (event) => {
    console.log(event.target.value); // Logs the current input value
    setName(event.target.value); // Updates the state with the input's new value
  };

  // Handle email change
  const onEmailChange = (event) => {
    console.log(event.target.value); // Logs the current input value
    setEmail(event.target.value); // Updates the state with the input's new value
  };

  // Handle password change
  const onPasswordChange = (event) => {
    console.log(event.target.value); // Logs the current input value
    setPassword(event.target.value); // Updates the state with the input's new value
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch(
        "https://smartbrain-backend-6y14.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
          mode: "cors", // Ensure that CORS is handled
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data.message); // Registration successful
        onUserUpdate({ name, email, password }); // Update user state // this is just for the app. js
        console.log(name);
        onRouteChange("home"); // Navigate to home page
      } else {
        console.error(data.error); // Handle registration error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <article className="glass br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={handleSubmit}>
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Name</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onNameChange} // Using separate function for name change
                  required
                  minLength={3}
                  placeholder="Enter your name"
                />
              </div>
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
                  onChange={onEmailChange} // Using separate function for email change
                  required
                  placeholder="Enter tour email"
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
                  id="password"
                  value={password}
                  onChange={onPasswordChange} // Using separate function for password change
                  required
                  minLength={3}
                  placeholder="Password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                //onClick={handleSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </form>
      </main>
    </article>
  );
}

export default Register;
