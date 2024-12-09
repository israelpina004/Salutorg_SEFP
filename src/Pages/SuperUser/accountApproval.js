import { useFetchData } from "../../Hooks/useFetchData";
import ActionCard from "../../Components/Action/actionCard.js";

function AccountApproval() {
  const { data: approvals, loading, error, setData: setApprovals } = useFetchData("/api/admin/approvals");

  const handleApprove = (userId) => {
    fetch(`/api/admin/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    }).then((response) => {
      if (response.ok) {
        setApprovals((prev) => prev.filter((user) => user.id !== userId));
      }
    });
  };

  const handleReject = (userId) => {
    fetch(`/api/admin/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    }).then((response) => {
      if (response.ok) {
        setApprovals((prev) => prev.filter((user) => user.id !== userId));
      }
    });
  };

  if (loading) return <p>Loading approvals...</p>;
  if (error) return <p>Error fetching approvals: {error}</p>;

  return (
    <div>
      <h1>Account Approvals</h1>
      <div className="approvals-container">
        {approvals.map((user) => (
          <ActionCard
            key={user.id}
            user={{ ...user, date: user.registration_date }}
            buttons={[
              { label: "Approve", action: handleApprove, className: "approve-btn" },
              { label: "Reject", action: handleReject, className: "reject-btn" },
            ]}
          />
        ))}
      </div>
    </div>
  );
}

export default AccountApproval;

