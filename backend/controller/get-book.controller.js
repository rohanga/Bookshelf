const worker = require("../helper/get-book").worker;

exports.getBook = (req, res) => {
  try {
    if (!req.params ) {
      return res.status(400).send("Request body is missing");
    }
    worker(
      
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
