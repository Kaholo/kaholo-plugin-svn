var svn = require ("node-svn-ultimate");

function checkOut(action, settings) {
    return new Promise((resolve,reject) => {
        let url = action.params.remote_SVN_repo;
        let wc = action.params.local_wc;
        let login = {
            username: action.params.USER || settings.USER,
            password: action.params.PASSWORD || settings.PASSWORD
        };
        svn.commands.co(url, wc, login, function (err, res) {
            if (err)
                return reject(err);

            resolve(res)
            }
        )})

}


module.exports = {
    checkOut: checkOut
};