import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";

// const Balance = () => {
//   const { user } = useUser(); // Get the logged-in user from context
//   const userId = user?.id; // Use the user's ID
//   const [balance, setBalance] = useState(0);
//   const[amount, setAmount] = useState(0);

// useEffect(() => {
//   fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/balance/${userId}`)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Fetched data: ", data)
//       setBalance(data.balance)
//     });
// }, [userId]);

// // Update the balance by making an API call
// const updateBalance = (amount) => {
//   fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/update-balance`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ userId, amount }),
//   })
//     .then((res) => res.json())
//     .then(() => {
//       // Refetch the updated balance
//       fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/balance/${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           console.log("Updated balance:", data.balance);
//           setBalance(data.balance);
//         })
//         .catch((err) => console.error("Error refetching balance: ", err));
//     })
//     .catch((err) => console.error("Error updating balance: ", err));
// };

// // Handle deposit
// const handleDeposit = () => {
//   console.log("Deposit Amount:", amount)
//   const value = amount
//   if (value > 0) {
//     updateBalance(value);
//     setAmount(""); // Clear the input
//   } else {
//     alert("Enter a valid amount");
//   }
// };

// // Handle withdrawal
// const handleWithdraw = () => {
//   console.log("Withdraw Amount:", amount)
//   const value = amount
//   if (value > 0 && value <= balance) {
//     updateBalance(-value); 
//     setAmount(""); 
//   } else {
//     alert("Invalid withdrawal amount");
//   }
// };
  
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Account Balance: ${Number(balance)}</h1>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//         placeholder="Enter amount"
//         style={{ marginRight: "10px" }}
//       />
//       <button onClick={handleDeposit} style={{ marginRight: "10px" }}>
//         Deposit
//       </button>
//       <button onClick={handleWithdraw}>Withdraw</button>
//     </div>
//   );
// };

// export default Balance;

const Balance = () => {
  // Ensure useUser() returns a valid object
  const { user } = useUser() || {}; // Provide a default empty object if useUser() returns null/undefined
  const userId = user?.id; // Optional chaining to safely access user.id
  
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  // Ensure effect only runs if userId exists
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/balance/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data: ", data);
          setBalance(data.balance);
        })
        .catch((err) => console.error("Error fetching balance:", err));
    }
  }, [userId]);

  const updateBalance = (amount) => {
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/update-balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, amount }),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/balance/${userId}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Updated balance:", data.balance);
            setBalance(data.balance);
          })
          .catch((err) => console.error("Error refetching balance:", err));
      })
      .catch((err) => console.error("Error updating balance:", err));
  };

  const handleDeposit = () => {
    if (amount > 0) {
      updateBalance(amount);
      setAmount(0); // Clear the input
    } else {
      alert("Enter a valid amount");
    }
  };

  const handleWithdraw = () => {
    if (amount > 0 && amount <= balance) {
      updateBalance(-amount); 
      setAmount(0); 
    } else {
      alert("Invalid withdrawal amount");
    }
  };

  // Return UI after all hooks are called
  if (!user) {
    return <div>Loading user...</div>;
  }

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