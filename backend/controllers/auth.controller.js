export const testController = async (req, res) => {
  res.send("Backend is running ");
};

export const getProfile = async (req, res) => {
  try {
    // const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in getProfile controller : ", err.message);
    res.status(500).json("Internal Server Error ");
  }
};
