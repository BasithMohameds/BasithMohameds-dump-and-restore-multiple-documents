exports.catchAsync = (myFunc) => (req, res, next) => {
  Promise.resolve(myFunc(req, res, next))
    .then(({ message = "error", status = false }) => {
      // console.log({ message });
      // console.log({ status });
      return res.status(200).json({ message, status });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ message: err?.message ?? "BB", status: false });
    });
};
