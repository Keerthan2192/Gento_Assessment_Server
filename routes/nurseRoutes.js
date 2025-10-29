const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Nurse = require("../models/NurseModel");

router.get("/", async (req, res) => {
  try {
    const nurses = await Nurse.findAll();
    res.json(nurses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, license_number, dob } = req.body;

    if (!name || !license_number || !dob) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await Nurse.findOne({ where: { license_number } });
    if (existing) {
      return res.status(400).json({ error: "License number already exists" });
    }

    const birthDate = new Date(dob);
    if (isNaN(birthDate)) {
      return res.status(400).json({ error: "Invalid date of birth" });
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const nurse = await Nurse.create({
      name,
      license_number,
      dob,
      age,
      createdAt: new Date(),
      updatedAt: null,
    });

    res.status(201).json({
      message: "Nurse added successfully",
      nurse,
    });
  } catch (err) {
    console.error("Error creating nurse:", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Nurse.destroy({ where: { id: req.params.id } });
    res.json({ message: "Nurse deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, license_number, dob } = req.body;
    const { id } = req.params;

    if (!name || !license_number || !dob) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const nurse = await Nurse.findByPk(id);
    if (!nurse) {
      return res.status(404).json({ error: "Nurse not found" });
    }

    const duplicate = await Nurse.findOne({
      where: {
        license_number,
        id: { [Sequelize.Op.ne]: id },
      },
    });

    if (duplicate) {
      return res.status(400).json({ error: "License number already exists" });
    }

    const birthDate = new Date(dob);
    if (isNaN(birthDate)) {
      return res.status(400).json({ error: "Invalid date of birth" });
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    await nurse.update({
      name,
      license_number,
      dob,
      age,
      updatedAt: new Date(),
    });

    res.json({ message: "Nurse updated successfully", nurse });
  } catch (err) {
    console.error("Error updating nurse:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
