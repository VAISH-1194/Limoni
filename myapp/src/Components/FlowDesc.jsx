import React, { useState } from "react";
import FlagIcon from "@mui/icons-material/Flag";
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

            {selectedDay === index && (
              <div className="timeline-container">
                <div className="timeline">
                  {violation.details.map((detail, idx) => {
                    const exceedSpeed = parseInt(detail.exceed_speed.replace(" km/h", ""), 10);
                    const zoneSpeed = parseInt(detail.zone_speed.replace(" km/h", ""), 10);

                    let flagColor = null;
                    if (exceedSpeed > zoneSpeed + 20 && exceedSpeed <= zoneSpeed + 40) {
                      flagColor = "yellow";
                    } else if (exceedSpeed > zoneSpeed + 40) {
                      flagColor = "red";
                    }

                    return (
                      <div key={idx} className="dot-box">
                        <div className="dot"></div>
                        {flagColor && (
                          <FlagIcon
                            style={{
                              color: flagColor,
                              position: "absolute",
                              top: "-40px",
                              fontSize: "20px",
                            }}
                          />
                        )}
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
                    );
                  })}
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
