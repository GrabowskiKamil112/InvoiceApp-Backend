const express = require("express");
const { invoice, user } = require("../controllers");

const router = express.Router();

router.post("/user/login", user.userLogin);
router.post("/user/logout", user.userLogout);
router.post("/user/register", user.userRegister);

router.get("/invoices", invoice.getAllInvoices);
router.get("/invoices/type", invoice.getAllInvoicesOfOneType);

router.post("/invoice", invoice.addInvoice);
router.get("/invoice/:id", invoice.getSingleInvoice);
router.put("/invoice/:id", invoice.updateInvoice);
router.delete("/invoice/:id", invoice.deleteInvoice);

module.exports = router;
