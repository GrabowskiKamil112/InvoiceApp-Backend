const mongoose = require("mongoose");
require("../models/Invoice");

const Invoice = mongoose.model("invoices");

const invoice = {
  addInvoice: async (req, res) => {
    console.log(req.body);

    const newInvoiceContent = {
      type: req.body.type, // draft, pending, paid
      from: {
        street: req.body.from.street,
        city: req.body.from.city,
        post_code: req.body.from.post_code,
        country: req.body.from.country,
      },
      to: {
        name: req.body.to.name,
        email: req.body.to.email,
        city: req.body.to.city,
        street: req.body.to.street,
        post_code: req.body.to.post_code,
        country: req.body.to.country,
      },
      invoice_date: req.body.invoice_date,
      payment_term: req.body.payment_term,
      description: req.body.description,
      items_list: req.body.items_list,
      userID: req.body.userID,
    };

    console.log("EEEEEEEEEEEE:", newInvoiceContent);

    try {
      const newInvoice = await new Invoice(newInvoiceContent).save(
        (err, invoice) => {
          res.send(invoice);
          console.log("Invoice saved:", invoice);
        }
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  getAllInvoices: (req, res) => {
    console.log(req);
    Invoice.find({ userID: req.query.userID })
      .then((results) => res.send(results))
      .catch((err) => console.log(err));
  },
  getAllInvoicesOfOneType: (req, res) => {
    console.log("query: " + req.query.userID);
    Invoice.find({ userID: req.query.userID, type: req.query.type })
      .then((results) => res.send(results))
      .catch((err) => console.log(err));
  },
  getSingleInvoice: (req, res) => {
    Invoice.findById(req.params.id)
      .then((results) => {
        if (!results) {
          res.send(404);
        } else {
          res.send(results);
        }
      })
      .catch((err) => res.send(404));
  },
  updateInvoice: (req, res) => {
    const updatedInvoiceContent = {
      type: req.body.type, // draft, pending, paid
      from: {
        street: req.body.from.street,
        city: req.body.from.city,
        post_code: req.body.from.post_code,
        country: req.body.from.country,
      },
      to: {
        name: req.body.to.name,
        email: req.body.to.email,
        city: req.body.to.city,
        street: req.body.to.street,
        post_code: req.body.to.post_code,
        country: req.body.to.country,
      },
      invoice_date: req.body.invoice_date,
      payment_term: req.body.payment_term,
      description: req.body.description,
      items_list: req.body.items_list,
      userID: req.body.userID,
    };
    Invoice.findByIdAndUpdate(req.params.id, updatedInvoiceContent)
      .then((updatedInvoice) =>
        res.send({ ...updatedInvoiceContent, _id: updatedInvoice._id })
      )
      .catch((err) => console.log(err));
  },
  deleteInvoice: (req, res) => {
    console.log("sdsdsdsdsd", req.params.id);
    Invoice.findByIdAndDelete(req.params.id)
      .then((result) => {
        console.log("res", result);
        if (!result) {
          res.sendStatus(404);
        } else {
          res.send(result);
        }
      })
      .catch((err) => res.sendStatus(500));
  },
};

module.exports = invoice;
