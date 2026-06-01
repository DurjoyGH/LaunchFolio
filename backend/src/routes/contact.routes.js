const { Router } = require("express");
const { createContact } = require("../controllers/contact.controller");
const { validate, contactSchema } = require("../utils/validator");

const router = Router();

router.post("/", validate(contactSchema), createContact);

module.exports = router;
