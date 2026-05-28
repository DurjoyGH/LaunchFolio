const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 12;

const hashPassword = async (password) => bcrypt.hash(password, SALT_ROUNDS);

const comparePassword = async (plain, hashed) => bcrypt.compare(plain, hashed);

module.exports = { hashPassword, comparePassword };
