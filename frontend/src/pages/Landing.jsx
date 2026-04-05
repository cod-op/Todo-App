import React from "react";
import { Link } from "react-router-dom";
import Hero from "../assets/hero.jpg";
import "./Landing.css";

function Landing() {
  return (
    <main className="landing">
      <section className="hero">
        
    
        <div className="hero-content">
          <h1 className="hero-title">
            Organize your work and life,
            <br />
            <span>finally.</span>
          </h1>

          <p className="hero-subtitle">
            Just type anything into the task field — our smart natural language
            recognition instantly converts it into actionable tasks.
          </p>

          <div className="hero-buttons">
            <Link className="btn1" to="/register">
               Signup
            </Link>
            <Link className="btn2" to="/login">
              Login
            </Link>
          </div>
        </div>

     
        <div className="hero-image">
          <img src={Hero} alt="Image" />
        </div>

      </section>
    </main>
  );
}

export default Landing;