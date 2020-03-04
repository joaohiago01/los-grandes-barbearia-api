//PRODUCTION
/*
module.exports = {
    host: 'ec2-54-197-34-207.compute-1.amazonaws.com',
    database: 'de23hn6llaqej9',
    username: 'ynbsgadzkfsgec',
    password: 'a31d663ed191261345094e2dc83b82111beb820f318d3c05e8c12bfb1b67f095',
    port: 5432,
    dialect: 'postgres',
    logging: console.log(),
    define: {
        timestamps: false
    }
};
*/

//DEV

module.exports = {
    host: 'localhost',
    database: 'LosGrandesBarbearia',
    username: 'postgres',
    password: 'ads',
    port: 5432,
    dialect: 'postgres',
    logging: console.log(),
    define: {
        timestamps: false
    }
};

