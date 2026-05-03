module.exports = (rules) => {
  return (req, res, next) => {
    const errors = rules(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors
      });
    }

    next(); // ✅ go to controller
  };
};
