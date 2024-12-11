import { useFetchData } from "../../Hooks/useFetchData";
import ActionCard from "../../Components/Action/actionCard.js";

function SuspensionApproval() {
  const { data: suspendedUsers, loading, error, setData: setSuspendedUsers } = useFetchData("/api/suspended");

  const handleRevoke = (userId) => {
    fetch(`/api/revoke`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    }).then((response) => {
      if (response.ok) {
        setSuspendedUsers((prev) => prev.filter((user) => user.id !== userId));
      }
    });
  };

  const handleKeep = (userId) => {
    fetch(`/api/keep`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    }).then((response) => {
      if (response.ok) {
        setSuspendedUsers((prev) => prev.filter((user) => user.id !== userId));
      }
    });
  };

  if (loading) return <p>Loading suspension appeals...</p>;
  if (error) return <p>Error fetching suspension appeals: {error}</p>;

  return (
    <div>
      <h1>Suspension Appeals</h1>
      <div className="suspensions-container">
        {suspendedUsers.map((user) => (
          <ActionCard
            key={user.id}
            user={{ ...user, date: user.suspension_date, reason: user.suspension_reason }}
            buttons={[
              { label: "Revoke", action: handleRevoke, className: "revoke-btn" },
              { label: "Keep", action: handleKeep, className: "keep-btn" },
            ]}
          />
        ))}
      </div>
    </div>
  );
}

export default SuspensionApproval;

