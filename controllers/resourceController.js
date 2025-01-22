const Resource = require("../models/Resource");

// Create a new resource
exports.createResource = async (req, res) => {
  try {
    const { title, content } = req.body;
    const resource = new Resource({
      title,
      content,
      createdBy: req.user.id,
    });
    await resource.save();
    res
      .status(201)
      .json({ message: "Resource created successfully", resource });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate(
      "createdBy",
      "username email"
    );
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a resource by its ID
exports.getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id).populate(
      "createdBy",
      "username email"
    );
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.status(200).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a resource by its ID
exports.updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const resource = await Resource.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!resource) return res.status(404).json({ error: "Resource not found" });

    res
      .status(200)
      .json({ message: "Resource updated successfully", resource });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a resource by its ID
exports.deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByIdAndDelete(id);
    if (!resource) return res.status(404).json({ error: "Resource not found" });

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
