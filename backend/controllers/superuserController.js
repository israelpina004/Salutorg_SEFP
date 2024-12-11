const db = require("../models/db");

// Fetch pending approvals
const getPendingApprovals = (req, res) => {
  const query = "SELECT id, email, registration_date FROM user WHERE is_approved = FALSE";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching pending approvals:", err);
      return res.status(500).json({ error: "Failed to fetch approvals." });
    }
    res.json(results);
  });
};

// Approve a user
const approveUser = (req, res) => {
  const { id } = req.body;
  const query = "UPDATE user SET is_approved = TRUE WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error approving user:", err);
      return res.status(500).json({ error: "Failed to approve user." });
    }
    res.json({ message: "User approved successfully." });
  });
};

// Reject a user
const rejectUser = (req, res) => {
  const { id } = req.body;
  const query = "DELETE FROM user WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error rejecting user:", err);
      return res.status(500).json({ error: "Failed to reject user." });
    }
    res.json({ message: "User rejected successfully." });
  });
};

// Fetch suspended users
const getSuspendedUsers = (req, res) => {
  const query = "SELECT id, email, suspension_date, suspension_reason FROM user WHERE is_suspended = TRUE";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching suspended users:", err);
      return res.status(500).json({ error: "Failed to fetch suspended users." });
    }
    res.json(results);
  });
};

// Revoke suspension
const revokeSuspension = (req, res) => {
  const { id } = req.body;
  const query = "UPDATE user SET is_suspended = FALSE, suspension_count = GREATEST(0, suspension_count - 1) WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error revoking suspension:", err);
      return res.status(500).json({ error: "Failed to revoke suspension." });
    }
    res.json({ message: "Suspension revoked successfully." });
  });
};

// Keep suspension and check for ban
const keepSuspension = (req, res) => {
  const { id } = req.body;
  const query = "UPDATE user SET suspension_count = suspension_count + 1 WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error keeping suspension:", err);
      return res.status(500).json({ error: "Failed to keep suspension." });
    }

    // Check for ban
    const checkBanQuery = "UPDATE user SET is_banned = TRUE WHERE id = ? AND suspension_count >= 3";
    db.query(checkBanQuery, [id], (checkErr) => {
      if (checkErr) {
        console.error("Error checking for ban:", checkErr);
        return res.status(500).json({ error: "Failed to update user ban status." });
      }
      res.json({ message: "Suspension updated successfully." });
    });
  });
};

// Export all functions
module.exports = {
  getPendingApprovals,
  approveUser,
  rejectUser,
  getSuspendedUsers,
  revokeSuspension,
  keepSuspension,
};
