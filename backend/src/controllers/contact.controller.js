const Contact = require("../models/Contact");
const { successResponse } = require("../utils/response");

const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);

    return successResponse(res, {
      statusCode: 201,
      message: "Thanks for your message. We will review it soon.",
      data: { contactId: contact._id },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createContact };
