import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./superUserDash.css";

function SuperUserDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isActive, setIsActive] = useState('approvals');

  const handleSignOut = () => {
    setIsLoggedIn(false);
    alert("You've signed out. See you soon!")
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleClick = (tab) => {
    setIsActive(tab);
  }

    return (
      <div>
        <div className="admin-dash">
          <aside className="sidebar">
            <h1>Navigation</h1>
              <ul>
                <li onClick={() => handleClick('approvals')}
                style={{ backgroundColor: isActive == 'approvals' ? '#cc3f07' : 'transparent' }}>
                  Account Approvals</li>
                  <li onClick={() => handleClick('suspensions')}
                style={{ backgroundColor: isActive == 'suspensions' ? '#cc3f07' : 'transparent' }}>
                  Suspension Appeals</li>
                <li onClick={handleSignOut}>Sign Out</li>
              </ul>
          </aside>

          <main className="main">
            <h1>SuperUser Dashboard</h1>
            <p1>Welcome back! Use Navigation to check pending account approvals, or handle any suspensions.</p1>
              {((isActive == 'approvals') && <p>Test</p>) || 
              ((isActive == 'suspensions') && <p>Test but like,,, the other one</p>)}
          </main>
        </div>
      </div>
    );
  }
  
  export default SuperUserDashboard;
