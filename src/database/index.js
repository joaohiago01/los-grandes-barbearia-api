const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Client = require('../models/Client');
const Barber = require('../models/Barber');
const Service = require('../models/Service');
const Timetable = require('../models/Timetable');
const Scheduling = require('../models/Scheduling');
const Barbershop = require('../models/Barbershop');

const connection = new Sequelize(dbConfig);

Client.init(connection);
Barber.init(connection);
Service.init(connection);
Timetable.init(connection);
Scheduling.init(connection);
Barbershop.init(connection);

Scheduling.associate(connection.models);
Client.associate(connection.models);
Barber.associate(connection.models);
Service.associate(connection.models);
Timetable.associate(connection.models);

module.exports = connection;