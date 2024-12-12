import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Balance = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(""); // New state to store username
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  // Fetch logged-in user and their balance
  useEffect(() => {
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getlogin`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(`Failed to fetch logged-in user: ${error.message}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.loggedInUser) {
          setUserId(data.loggedInUser.user_ID); // Use the user_ID from response
          setUsername(data.loggedInUser.username); // Set the username
          setBalance(data.loggedInUser.balance); // Set the initial balance
        } else {
          console.error("No user is currently logged in.");
        }
      })
      .catch((err) => console.error("Error fetching logged-in user:", err));
  }, []);

  // Update balance API call
  const updateBalance = (amount) => {
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/update-balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, amount }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to update balance. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Updated balance:", data.balance);
        setBalance(data.balance); // Set the updated balance returned from API
      })
      .catch((err) => console.error("Error updating balance:", err));
  };

  // Handle deposit
  const handleDeposit = () => {
    if (amount > 0) {
      updateBalance(Number(amount));
      setAmount(""); // Clear the input
    } else {
      alert("Enter a valid amount");
    }
  };

  // Handle withdrawal
  const handleWithdraw = () => {
    if (amount > 0 && Number(amount) <= balance) {
      updateBalance(-Number(amount));
      setAmount(""); // Clear the input
    } else {
      alert("Invalid withdrawal amount");
    }
  };

  if (!userId) {
    return <div>Loading user...</div>;
  }

  return (
    <>
      <div className="auth-title">{username}'s Balance: ${Number(balance || 0).toFixed(2)}</div> {/* Display username */}
      <div className="auth-form-container">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleDeposit} className="auth-submit-button" style={{ marginRight: "10px" }}>
          Deposit
        </button>
        <button onClick={handleWithdraw} className="auth-submit-button">Withdraw</button>
      </div>

      {/* Link to the Profile page */}
      <div className="auth-form-container">
        <Link to="/profile">Back to Account Settings</Link>
      </div>

    </>
  );
};

export default Balance;
