const express = require('express');
const BarbershopController = require('./controllers/BarbershopController');
const ClientController = require('./controllers/ClientController');
const BarberController = require('./controllers/BarberController');
const ServiceController = require('./controllers/ServiceController');
const TimetableController = require('./controllers/TimetableController');
const SchedulingController = require('./controllers/SchedulingController');

const routes = express.Router();

routes.post('/barbershop', BarbershopController.post);
routes.get('/barbershop', BarbershopController.get);
routes.put('/barbershop', BarbershopController.put);
routes.delete('/barbershop', BarbershopController.delete);

routes.post('/client', ClientController.post);
routes.get('/client', ClientController.get);
routes.get('/client/list-clients', ClientController.list_clients);
routes.get('/client/loyal-clients', ClientController.loyal_clients);
routes.put('/client', ClientController.put);
routes.delete('/client', ClientController.delete);

routes.post('/barber', BarberController.post);
routes.get('/barber', BarberController.get);
routes.get('/barber/list-barbers', BarberController.list_barbers);
routes.get('/barber/barbers-most-productive', BarberController.barbers_most_productive);
routes.put('/barber', BarberController.put);
routes.delete('/barber', BarberController.delete);

routes.post('/service', ServiceController.post);
routes.get('/service', ServiceController.get);
routes.get('/service/list-services', ServiceController.list_services);
routes.get('/service/services-most-requests', ServiceController.services_most_requests);
routes.put('/service', ServiceController.put);
routes.delete('/service', ServiceController.delete);

routes.post('/timetable', TimetableController.post);
routes.get('/timetable', TimetableController.get);
routes.get('/timetable/most-actives', TimetableController.timetables_most_active);
routes.put('/timetable', TimetableController.put);
routes.delete('/timetable', TimetableController.delete);

routes.post('/scheduling', SchedulingController.post);
routes.post('/scheduling/scheduling-services', SchedulingController.scheduling_services);
routes.get('/scheduling', SchedulingController.get);
routes.get('/scheduling/list-schedulings', SchedulingController.list_schedulings);
routes.get('/scheduling/gain-in-a-day', SchedulingController.gain_in_a_day);
routes.get('/scheduling/gain-in-a-week', SchedulingController.gain_in_a_week);
routes.get('/scheduling/gain-in-a-month', SchedulingController.gain_in_a_month);
routes.get('/scheduling/gain-in-a-year', SchedulingController.gain_in_a_year);
routes.put('/scheduling', SchedulingController.put);
routes.delete('/scheduling', SchedulingController.delete);

module.exports = routes;