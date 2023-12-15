const userController = {
  registerUser: async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      if (!name || !email || !password) {
        return res
          .status(400)
          .send({ message: "pleasse enter all required fields" });
      }

      const dbEmail = await User.findOne({ email });

      if (dbEmail) {
        return res.status(400).send({
          message: "email already exists",
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 5);

      var data = await User({
        ...req.body,
        password: encryptedPassword,
      }).save();
      res.send(data);
    } catch (error) {
      res.send(error.message);
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const data = await User.findOne({ email });
      if (!data) {
        return res.send("You have to register first");
      }
      console.log(data.password);

      const decryptPassword = await bcrypt.compare(password, data.password);
      if (!decryptPassword) {
        return res.status(400).send({
          message: "invalid password",
        });
      }
      const token = await jwt.sign(email, process.env.tokenKey);
      res.send({
        token,
        message: "login successfull",
      });
    } catch (error) {
      res.send(error.message);
    }
  },
};

module.exports = userController