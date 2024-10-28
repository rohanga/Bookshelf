
const worker = require("../helper/delete-bookshelf").worker;

exports.book = async (req, res) => {
    try {
        console.log("Delete book=====>",req.params)
        worker(req.params.id,(err, result) => {
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
