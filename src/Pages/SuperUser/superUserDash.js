import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AccountApproval from "./accountApproval";
import SuspensionApproval from "./suspensionApproval";
import "./superUserDash.css";

function SuperUserDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isActive, setIsActive] = useState("approvals");

  const handleSignOut = () => {
    setIsLoggedIn(false);
    alert("You've signed out. See you soon!");
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleClick = (tab) => {
    setIsActive(tab);
  };

  return (
    <div>
      <div className="admin-dash">
        <aside className="sidebar">
          <h1>Navigation</h1>
          <ul>
            <li
              onClick={() => handleClick("approvals")}
              style={{
                backgroundColor: isActive === "approvals" ? "#cc3f07" : "transparent",
              }}
            >
              Account Approvals
            </li>
            <li
              onClick={() => handleClick("suspensions")}
              style={{
                backgroundColor: isActive === "suspensions" ? "#cc3f07" : "transparent",
              }}
            >
              Suspension Appeals
            </li>
            <li onClick={handleSignOut}>Sign Out</li>
          </ul>
        </aside>

        <main className="main">
          <h1>SuperUser Dashboard</h1>
          <p>Welcome back! Use Navigation to check pending account approvals, or handle any suspensions.</p>
          {isActive === "approvals" && <AccountApproval />}
          {isActive === "suspensions" && <SuspensionApproval />}
        </main>
      </div>
    </div>
  );
}

export default SuperUserDashboard;
