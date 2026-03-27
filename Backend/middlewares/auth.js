const JWT = require("jsonwebtoken");

module.exports  = async(req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      } else {
       
        req.user = decode.id;
        next();
      }
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Please provide Auth token",
      error:error.message
    });
  }
};