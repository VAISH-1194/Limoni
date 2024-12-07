import React, { useState } from "react";
import "../Assets/flowdesc.css";
import data from "../Assets/data.json";

const FlowDesc = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const toggleDay = (index) => {
    setSelectedDay(selectedDay === index ? null : index);
  };

  return (
    <div className="flowdesc-window">
      <div className="flowdesc-container">
        {data.violations.map((violation, index) => (
          <div key={index} className="date-section">
            {/* Header for each day */}
            <div
              className={`date-header ${
                selectedDay === index ? "active" : ""
              }`}
              onClick={() => toggleDay(index)}
            >
              <span>
                <strong>Date:</strong> {violation.day}
              </span>
              <span>
                <strong>Vehicle Number:</strong> {`Vehicle-${index + 1}`}
              </span>
              <span>
                <strong>Total Violations:</strong> {violation.details.length}
              </span>
              <span>
                <strong>Violated Fare:</strong> ₹{500 * violation.details.length}
              </span>
              <span>{selectedDay === index ? "▲" : "▼"}</span>
            </div>

            {/* Timeline details */}
            {selectedDay === index && (
              <div className="timeline-container">
                <div className="timeline">
                  {violation.details.map((detail, idx) => (
                    <div key={idx} className="dot-box">
                      <div className="dot"></div>
                      <div className="info-box">
                        <p>
                          <strong>Time:</strong> {detail.time}
                        </p>
                        <p>
                          <strong>Place:</strong> {detail.place}
                        </p>
                        <p>
                          <strong>Zone Speed:</strong> {detail.zone_speed}
                        </p>
                        <p>
                          <strong>Exceed Speed:</strong> {detail.exceed_speed}
                        </p>
                        <p>
                          <strong>Duration:</strong> {detail.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowDesc;
