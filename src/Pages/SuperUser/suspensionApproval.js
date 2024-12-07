import { useEffect, useState } from "react";

function SuspensionApproval() {
  const [suspendedUsers, setSuspendedUsers] = useState([]);

  // Fetch suspended users
  useEffect(() => {
    fetch("/api/admin/suspended")
      .then((response) => response.json())
      .then((data) => setSuspendedUsers(data))
      .catch((error) => console.error("Error fetching suspended users:", error));
  }, []);

  const handleRevoke = (userId) => {
    fetch(`/api/admin/revoke`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    })
      .then((response) => {
        if (response.ok) {
          setSuspendedUsers(suspendedUsers.filter((user) => user.id !== userId));
        }
      })
      .catch((error) => console.error("Error revoking suspension:", error));
  };

  const handleKeep = (userId) => {
    fetch(`/api/admin/keep`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    })
      .then((response) => {
        if (response.ok) {
          setSuspendedUsers(suspendedUsers.filter((user) => user.id !== userId));
        }
      })
      .catch((error) => console.error("Error keeping suspension:", error));
  };

  return (
    <div>
      <h1>Suspension Appeals</h1>
      <div className="suspensions-container">
        {suspendedUsers.map((user) => (
          <div key={user.id} className="suspension-card">
            <p>Email: {user.email}</p>
            <p>Suspension Date: {user.suspension_date}</p>
            <p>Reason: {user.suspension_reason}</p>
            <button onClick={() => handleRevoke(user.id)} className="revoke-btn">
              Revoke Suspension
            </button>
            <button onClick={() => handleKeep(user.id)} className="keep-btn">
              Keep Suspension
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuspensionApproval;
