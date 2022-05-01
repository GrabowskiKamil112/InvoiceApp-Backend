const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const INVOICE_TYPES = ["paid", "pending", "draft"];

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    defualt: null,
  },
  price: {
    type: String,
    defualt: null,
  },
  total: {
    type: String,
    defualt: null,
  },
});

const InvoiceSchema = new Schema({
  type: {
    type: String,
    enum: INVOICE_TYPES,
    required: true,
  },
  from: {
    street: {
      type: String,
      defualt: null,
    },
    city: {
      type: String,
      defualt: null,
    },
    post_code: {
      type: String,
      defualt: null,
    },
    country: {
      type: String,
      defualt: null,
    },
  },
  to: {
    name: {
      type: String,
      defualt: null,
    },
    email: {
      type: String,
      defualt: null,
    },
    city: {
      type: String,
      defualt: null,
    },
    post_code: {
      type: String,
      defualt: null,
    },
    country: {
      type: String,
      defualt: null,
    },
    street: {
      type: String,
      defualt: null,
    },
  },
  invoice_date: {
    type: String,
    required: true,
  },
  payment_term: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    defualt: null,
  },
  items_list: [itemSchema],
  userID: {
    type: String,
    required: true,
  },
});

mongoose.model("invoices", InvoiceSchema);
