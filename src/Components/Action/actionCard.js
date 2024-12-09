import PropTypes from "prop-types";

const ActionCard = ({ user, buttons }) => {
  if (!user || !buttons) {
    console.error("ActionCard requires 'user' and 'buttons' props");
    return null;
  }

  return (
    <div className="action-card">
      <p>Email: {user.email || "No email provided"}</p>
      <p>Date: {user.date || "No date provided"}</p>
      {user.reason && <p>Reason: {user.reason}</p>}
      <div className="action-buttons">
        {buttons.map(({ label, action, className }, index) => (
          <button
            key={`${label}-${index}`}
            onClick={() => action(user.id)}
            className={className || "default-btn"}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

// PropTypes for validation
ActionCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string,
    date: PropTypes.string,
    reason: PropTypes.string,
  }).isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      className: PropTypes.string,
    })
  ).isRequired,
};

// Default props
ActionCard.defaultProps = {
  user: {
    email: "No email",
    date: "No date",
    reason: null,
  },
  buttons: [],
};

export default ActionCard;