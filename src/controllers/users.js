import Permission from "../models/permissions.js";
import User from "../models/users.js";
import bcrypt from "bcrypt";

const UserController = {
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId).exec();

      const permission = await Permission.findOne({ user: userId }).exec();

      res.json({
        ...user.toJSON(),
        role: permission.role,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { userName, phoneNumber, fullName, cccd } = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        {
          userName,
          phoneNumber,
          fullName,
          cccd,
        },
        { new: true }
      ).exec();

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  changeProfilePassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { password, newPassword } = req.body;

      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return res.status(404).json({
          message: "Không tìm thấy tài khoản!",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Mật khẩu hiện tại không chính xác!" });
      }

      const isSameOldPassword = await bcrypt.compare(
        newPassword,
        findUser.password
      );
      if (isSameOldPassword) {
        return res
          .status(406)
          .json({ message: "Mật khẩu cũ không được trùng mật khẩu mới" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
      }).exec();

      res.json({
        message: "Đổi mật khẩu thành công",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default UserController;
