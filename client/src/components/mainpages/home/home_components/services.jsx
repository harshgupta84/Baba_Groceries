// Services.jsx
import React from "react";
import "../style.css";

export const Services = (props) => {
  return (
    <div id="services">
      <div className="container">
        <div className="section-title text-center">
          <h2>Our Services</h2>
          <p>Your favourite store provides the best services:</p>
        </div>
        <div className="row justify-content-center">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="service-icon text-center">
                    <i className={`fa ${d.icon}`}></i>
                  </div>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
