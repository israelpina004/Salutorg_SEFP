import React, { useState, useEffect } from "react";

//IMPORTANT
//RN - Using static userId to make sure components functions normally
//In real application need way to get userId of currently logged in user!!!
const Balance = ({userId = 1}) => {
  const [balance, setBalance] = useState(0);
  const[amount, setAmount] = useState(0);

useEffect(() => {
  fetch(`http://localhost:5000/balance/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched data: ", data)
      setBalance(data.balance)
    });
}, [userId]);

// Update the balance by making an API call
const updateBalance = (amount) => {
  fetch("http://localhost:5000/update-balance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, amount }),
  })
    .then((res) => res.json())
    .then(() => {
      // Refetch the updated balance
      fetch(`http://localhost:5000/balance/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Updated balance:", data.balance);
          setBalance(data.balance);
        })
        .catch((err) => console.error("Error refetching balance: ", err));
    })
    .catch((err) => console.error("Error updating balance: ", err));
};

// Handle deposit
const handleDeposit = () => {
  console.log("Deposit Amount:", amount)
  const value = amount
  if (value > 0) {
    updateBalance(value);
    setAmount(""); // Clear the input
  } else {
    alert("Enter a valid amount");
  }
};

// Handle withdrawal
const handleWithdraw = () => {
  console.log("Withdraw Amount:", amount)
  const value = amount
  if (value > 0 && value <= balance) {
    updateBalance(-value); 
    setAmount(""); 
  } else {
    alert("Invalid withdrawal amount");
  }
};
  
  return (
    <div style={{ padding: "20px" }}>
      <h1>Account Balance: ${Number(balance)}</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleDeposit} style={{ marginRight: "10px" }}>
        Deposit
      </button>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
};

export default Balance;