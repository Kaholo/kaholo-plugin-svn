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
        svn.commands.co(url, wc, options, function (err, res) {
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

function getTasks(action, settings) {
    return new Promise((resolve, reject) => {
        let options = {
            username: action.params.USER || settings.USER,
            password: action.params.PASSWORD || settings.PASSWORD,
            revision: action.params.REVISION,
            verbose: true
        };
        let cmdOut = "";
        let output = "";
        let tasksArray = [];
        let target = action.params.TARGET;

        if (action.params.PATTERN.startsWith('/') && action.params.PATTERN.endsWith('/'))
            action.params.PATTERN = action.params.PATTERN.slice(1,-1);

        let pattern = new RegExp(action.params.PATTERN);
        svn.commands.log(target, options, function (err, res) {
            if (err)
                return reject(err)
            if (!Array.isArray(res.logentry))
                res.logentry = [res.logentry];

            res.logentry.forEach(results => {
                let taskNumber = results.msg.match(pattern);
                if (taskNumber != undefined) {
                    cmdOut = (taskNumber.length ? taskNumber[0] : '')
                    tasksArray.push(cmdOut)
                }
            })
            removeDups = new Set(tasksArray)
            removeDups.forEach(out => {
                output += out + "\n";
            })
            resolve(output)
        })
    })
}



module.exports = {
    checkOut: checkOut,
    getRevision: getRevision,
    getTasks: getTasks
};