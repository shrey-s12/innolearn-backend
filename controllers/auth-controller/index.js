const User = require("../../models/User");
const Instructor = require("../../models/Instructor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const {
    userFullName,
    userName,
    userEmail,
    password,
    confirmPassword,
    role,
    userPhoneNumber,
    userDateOfBirth,
    userGender,
    userInterests,
    userAddress,
  } = req.body;

  const { country, state, city, street } = userAddress;

  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name or user email already exists",
    });
  }

  if (userFullName === userName) {
    return res.status(400).json({
      success: false,
      message: "User name and user full name cannot be the same",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userFullName,
    userName,
    userEmail,
    role,
    password: hashPassword,
    confirmPassword: hashPassword,
    userPhoneNumber,
    userDateOfBirth,
    userGender,
    userInterests,
    userAddress: {
      country,
      state,
      city,
      street,
    },
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
  });
};

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  try {
    const checkUser = await User.findOne({ userEmail: userEmail });
    if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
      // Generate and return token...
      const accessToken = jwt.sign(
        {
          _id: checkUser._id,
          userImage: checkUser.userProfilePicture,
          userName: checkUser.userName,
          userEmail: checkUser.userEmail,
          role: checkUser.role,
        },
        "JWT_SECRET",
        { expiresIn: "120m" }
      );

      return res.status(200).json({
        success: true,
        message: "Logged in successfully as User",
        data: {
          accessToken,
          user: {
            _id: checkUser._id,
            userImage: checkUser.userProfilePicture,
            userName: checkUser.userName,
            userEmail: checkUser.userEmail,
            role: checkUser.role,
          },
        },
      });
    }

    const checkInstructor = await Instructor.findOne({
      instructorEmail: userEmail,
    });
    if (
      checkInstructor &&
      (await bcrypt.compare(password, checkInstructor.instructorPassword))
    ) {
      // Generate and return token...
      const instructorAccessToken = jwt.sign(
        {
          _id: checkInstructor._id,
          instructorImage: checkInstructor.instructorProfilePicture,
          instructorName: checkInstructor.instructorName,
          instructorEmail: checkInstructor.instructorEmail,
          role: checkInstructor.role,
        },
        "JWT_SECRET",
        { expiresIn: "120m" }
      );

      return res.status(200).json({
        success: true,
        message: "Logged in successfully as Instructor",
        data: {
          accessToken: instructorAccessToken,
          instructor: {
            _id: checkInstructor._id,
            instructorImage: checkInstructor.instructorProfilePicture,
            instructorName: checkInstructor.instructorName,
            instructorEmail: checkInstructor.instructorEmail,
            role: checkInstructor.role,
          },
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { registerUser, loginUser };
