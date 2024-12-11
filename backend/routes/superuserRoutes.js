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
  
  router.get("/pending-approvals", getPendingApprovals); // admin dashboard.... calls this 
  router.post("/approve", approveUser); // button 
  router.post("/reject", rejectUser); // button 
  router.get("/suspended", getSuspendedUsers); // dashboard 
  router.post("/revoke", revokeSuspension); // button
  router.post("/keep", keepSuspension); //button 
  
  module.exports = router;