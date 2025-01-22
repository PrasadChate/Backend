const express = require("express");
const {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const { validateResource } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post(
  "/create",
  authenticateToken,
  authorizeRoles("admin"),
  validateResource,
  createResource
);
router.get("/all", authenticateToken, getAllResources);
router.get("/byId/:id", authenticateToken, getResourceById);
router.put(
  "/update/:id",
  authenticateToken,
  authorizeRoles("admin"),
  validateResource,
  updateResource
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteResource
);

module.exports = router;
