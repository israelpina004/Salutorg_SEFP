const express = require("express");

const {
    getPendingApprovals,
    approveUser,
    rejectUser,
    getSuspendedUsers,
    revokeSuspension,
    keepSuspension,
  } = require("../controllers/superuserController");

  const router = express.Router();
  
  // Pending approvals
  router.get("/pending-approvals", getPendingApprovals);
  
  // Approve or reject a user
  router.post("/approve", approveUser);
  router.post("/reject", rejectUser);
  
  // Suspensions
  router.get("/suspended", getSuspendedUsers);
  router.post("/revoke", revokeSuspension);
  router.post("/keep", keepSuspension);
  
  module.exports = router;