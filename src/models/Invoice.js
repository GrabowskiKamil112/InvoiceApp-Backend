const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const INVOICE_TYPES = ["paid", "pending", "draft"];

const NoteSchema = new Schema({
  type: {
    type: String,
    enum: INVOICE_TYPES,
    required: true,
  },
  from: [
      street:{
        type: String,
        required: true,
      },
      city:{
        type: String,
        required: true,
      }
  ],
  userID: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
});

mongoose.model("notes", NoteSchema);
