if(process.env.NODE_ENV === 'dev'){
    const dotenv = require('dotenv');
    dotenv.load();
}

const winston = require('winston');
winston.level = process.env.LOG_LEVEL || 'error';
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    timestamp: true,
    level: 'verbose',
    colorize: true
});
module.exports = winston;
