module.exports = (err, req, res, next) => {
  console.log(err.errors);
  res.status(500).json({ message: err.errors });
};
