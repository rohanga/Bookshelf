const worker = require("../helper/get-currently-reading").worker;

exports.currentlyReading = (req, res) => {
  try {
   
    worker(
      req.params,
      (err, result) => {
        if (err.status !== 200) {
   
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
