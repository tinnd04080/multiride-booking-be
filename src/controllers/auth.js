import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthController = {
  signUp: async (req, res) => {
    const { userName, password, email, phoneNumber, fullName, cccd } = req.body;

    try {
      const emailOrPhoneExists = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      }).exec();

      if (emailOrPhoneExists) {
        return res.status(400).json({
          message: "Email hoặc số điện thoại đã tồn tại",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userCount = await User.countDocuments();
      const role = userCount > 0 ? "USER" : "ADMIN";

      await new User({
        userName,
        password,
        email,
        phoneNumber,
        fullName,
        cccd,
        password: hashedPassword,
        role,
      }).save();

      res.status(201).json({
        status: true,
        message: "Đăng ký tài khoản thành công",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;

    try {
      // check email registered
      const findUser = await User.findOne({ email }).exec();

      if (!findUser) {
        return res.status(404).json({ message: "Tài khoản chưa đăng ký!" });
      }

      // check password
      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Mật khẩu không chính xác!" });
      }

      const token = jwt.sign(
        {
          id: findUser._id,
          email: findUser.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      res.json({
        user: findUser,
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default AuthController;
