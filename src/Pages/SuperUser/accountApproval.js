import { useEffect, useState } from "react";

function AccountApproval() {
  const [approvals, setApprovals] = useState([]);

  // Fetch pending approvals
  useEffect(() => {
    fetch("/api/admin/approvals")
      .then((response) => response.json())
      .then((data) => setApprovals(data))
      .catch((error) => console.error("Error fetching approvals:", error));
  }, []);

  const handleApprove = (userId) => {
    fetch(`/api/admin/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    })
      .then((response) => {
        if (response.ok) {
          setApprovals(approvals.filter((user) => user.id !== userId));
        }
      })
      .catch((error) => console.error("Error approving user:", error));
  };

  const handleReject = (userId) => {
    fetch(`/api/admin/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    })
      .then((response) => {
        if (response.ok) {
          setApprovals(approvals.filter((user) => user.id !== userId));
        }
      })
      .catch((error) => console.error("Error rejecting user:", error));
  };

  return (
    <div>
      <h1>Account Approvals</h1>
      <div className="approvals-container">
        {approvals.map((user) => (
          <div key={user.id} className="approval-card">
            <p>Email: {user.email}</p>
            <p>Registration Date: {user.registration_date}</p>
            <button onClick={() => handleApprove(user.id)} className="approve-btn">
              Approve
            </button>
            <button onClick={() => handleReject(user.id)} className="reject-btn">
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountApproval;
