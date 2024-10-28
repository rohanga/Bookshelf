
const worker = require("../helper/mark-as-finished").worker;

exports.markAsFinished = async (req, res) => {
    try {
        worker(req.body,(err, result) => {
            if (err.status!=200 && err.status!=409) {
                console.error(err);
                res.status(500).send('Internal server error');
            }if (err.status==409) {
                console.error(err);
                res.status(409).send(err.message);
            } else {
                res.write(JSON.stringify(result));
                res.end();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};
