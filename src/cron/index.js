const UpdateCredit = require('./UpdateCredit');

class MangerCron {
    constructor(){
        this.jobs = [UpdateCredit]
    }

    run(){
        this.jobs.forEach(job => job.start())
    }
}


module.exports = new MangerCron()