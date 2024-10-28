const worker = require("../helper/get-comment").worker;

exports.getComment = (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is missing");
    }
    worker(
      req.body,
      req.params,
      (err, result) => {
        if (err.status !== 200) {
          res.statusMessage = err.message;
          return res.status(err.status).send(err.message);
        }
        res.write(JSON.stringify(result));
        res.end();
      }
    );
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
