const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/adminModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "الرجاء إدخال البريد الإلكتروني وكلمة المرور",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "تسجيل الدخول ناجح",
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "خطأ في الخادم",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "المشرف غير موجود",
      });
    }

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Get admin error:", error);

    return res.status(500).json({
      success: false,
      message: "خطأ في الخادم",
    });
  }
};

const logout = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "تسجيل الخروج ناجح",
  });
};

module.exports = {
  login,
  getMe,
  logout,
};
