const express = require("express");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  let notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

router.post(
  "/addnotes",
  fetchuser,
  [
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        const { title, description, tag } = req.body;
        let note = new Note({
          title,
          description,
          tag,
          user: req.user.id,
        });
        let savedNote = await note.save();
        res.send(savedNote);
      } else {
        res.status(401).send("not allowed");
      }
    } catch (err) {
      console.log(`Some error occured`);
    }
  }
);

router.put("/editnote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(401).send("Access not allowed");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    return res.send(note);
  } catch (err) {
    console.error(`Some error occured ${err}`);
    return res.status(500).send("Internal server error");
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access denied");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.send("Deleted Successfully");
  } catch (err) {
    console.error(`Some error occured ${err}`);
    return res.status(500).send("Internal server error");
  }
});
module.exports = router;
