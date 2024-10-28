
const worker = require("../helper/get-bookshelf").worker;

exports.book = async (req, res) => {
    try {
        worker(req.params,(err, result) => {
            if (err.status!=200) {
                console.error(err);
                res.status(500).send('Internal server error');
            
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
