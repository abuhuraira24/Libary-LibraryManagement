// TODO: Validation user input

// TODO: Find user in database

// TODO: Compare password

const User = require("../../model/User");

const { validateLoginInput } = require("../../utils/validator");

const { UserInputError } = require("apollo-server-express");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const { SECRET_KEY } = require("../../config");

module.exports = {
  Mutation: {
    async login(_, { email, password }) {
      const { valid, errors } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        errors.genaral = "User not found!";

        throw new UserInputError("User not found!", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.genaral = "Wrong Creadntials";

        throw new UserInputError("Wrong Creadntials", { errors });
      }

      const token = jwt.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
        },
        SECRET_KEY,
        { expiresIn: "2h" }
      );
      return {
        ...user._doc,
        id: user.id,
        email: user.email,
        token,
      };
    },
  },
};
