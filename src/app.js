var svn = require ("node-svn-ultimate");

function _options(action, settings){
    return {
        username: action.params.USER || settings.USER,
        password: action.params.PASSWORD || settings.PASSWORD
    }
}

function checkOut(action, settings) {
    return new Promise((resolve,reject) => {
        let url = action.params.remote_SVN_repo;
        let wc = action.params.local_wc;
        let options = _options(action, settings)
        svn.commands.co(url, wc, login, function (err, res) {
            if (err)
                return reject(err);

            resolve(res)
            }
        )})

}

function getRevision(action, settings) {
    return new Promise((resolve, reject) => {
        let target = action.params.TARGET;
        let options = _options(action, settings)
        svn.commands.info(target, options, function (err, res) {
            if (err)
                return reject(err)
            resolve(res.entry.$.revision)
        })
    })
}


module.exports = {
    checkOut: checkOut,
    getRevision: getRevision
};