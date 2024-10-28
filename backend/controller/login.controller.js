const worker = require("../helper/login").worker;

exports.login = (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Input parameter is missing");
    }
    worker(
      req.body,
      (err, result) => {
        if (err.status !== 200&&err.status !== 404) {
      
          return res.status(err.status).send(err.message);
        }else if (err.status == 404) {
        
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
