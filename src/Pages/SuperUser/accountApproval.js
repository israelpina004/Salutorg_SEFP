import { useEffect, useState } from "react";
import "./accountApproval.css"

const AccountApproval = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/pending-approvals`)
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Error fetching approvals: ${text}`);
          });
        }
        return res.json(); // Parse JSON response
      })
      .then((data) => {
        setApprovals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching approvals:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleApprove = (userId) => {
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    }).then((res) => {
      if (res.ok) {
        setApprovals((prev) => prev.filter((user) => user.id !== userId));
      } else {
        console.error("Failed to approve user");
      }
    });
  };

  const handleReject = (userId) => {
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    }).then((res) => {
      if (res.ok) {
        setApprovals((prev) => prev.filter((user) => user.id !== userId));
      } else {
        console.error("Failed to reject user");
      }
    });
  };

  if (loading) return <p>Loading pending approvals...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Pending Approvals</h1>
      <div className="approval-container">
        {approvals.map((user) => (
          <div key={user.id} className="approval-card">
            <p>Email: {user.email}</p>
            <p>Registration Date: {user.registration_date}</p>
            <button onClick={() => handleApprove(user.id)}>Approve</button>
            <button onClick={() => handleReject(user.id)}>Reject</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountApproval;