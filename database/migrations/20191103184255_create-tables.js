
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('washers', washers => {
        washers.increments('washerId');
        washers.string('email', 128)
            .notNullable()
            .unique();
        washers.string('password', 128).notNullable();
        washers.string('firstName', 128).notNullable();
        washers.string('lastName', 128).notNullable();
        washers.string('phoneNumber', 12).notNullable();
        washers.string('billingAddress', 400).notNullable();
        washers.string('stripeUUID', 128).unique();
    })
    .createTable('clients', clients => {
        clients.increments('clientId');
        clients.string('email', 128)
            .notNullable()
            .unique();
        clients.string('password', 128).notNullable();
        clients.string('firstName', 128).notNullable();
        clients.string('lastName', 128).notNullable();
        clients.string('phoneNumber', 12).notNullable();
        clients.string('billingAddress', 400).notNullable();
        clients.string('stripeUUID', 128).unique();
    })
    .createTable('cars', cars => {
        cars.increments('carId');
        cars.integer('year', 5).notNullable();
        cars.string('make', 128).notNullable();
        cars.string('model', 128).notNullable();
        cars.decimal('baseWashCost', 8).notNullable();
    })
    .createTable('clientCars', clientCars => {
        clientCars.increments('clientCarId');
        clientCars.integer('carId')
            .unsigned()
            .notNullable()
            .references('carId')
            .inTable('cars')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
        clientCars.integer('clientId')
            .unsigned()
            .notNullable()
            .references('clientId')
            .inTable('clients')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
        clientCars.string('color').notNullable();
        clientCars.string('licensePlate', 9).notNullable();
    })
    .createTable('jobs', jobs => {
        jobs.increments('jobId');
        jobs.string('washAddress', 128).notNullable();
        jobs.boolean('scheduled').notNullable().defaultTo(true);
        jobs.boolean('completed').notNullable().defaultTo(false);
        jobs.boolean('paid').notNullable().defaultTo(false);
        jobs.integer('clientId')
            .unsigned()
            .notNullable()
            .references('clientId')
            .inTable('clients')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
        jobs.integer('clientCarId')
            .unsigned()
            .notNullable()
            .references('clientCarId')
            .inTable('clientCars')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
        jobs.integer('washerId')
            .unsigned()
            .notNullable()
            .references('washerId')
            .inTable('washers')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
    })
    .createTable('ratingsOW', ratingsOW => {
        ratingsOW.increments('ratingOWId');
        ratingsOW.integer('rating', 2).notNullable();
        ratingsOW.string('notes', 400);
        ratingsOW.integer('clientId')
            .unsigned()
            .notNullable()
            .references('clientId')
            .inTable('clients')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
        ratingsOW.integer('washerId')
            .unsigned()
            .notNullable()
            .references('washerId')
            .inTable('washers')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
    })
    .createTable('ratingsOC', ratingsOC => {
        ratingsOC.increments('ratingOCId');
        ratingsOC.integer('rating', 2).notNullable();
        ratingsOC.string('notes', 400);
        ratingsOC.integer('clientId')
            .unsigned()
            .notNullable()
            .references('clientId')
            .inTable('clients')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
        ratingsOC.integer('washerId')
            .unsigned()
            .notNullable()
            .references('washerId')
            .inTable('washers')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('ratingsOC')
        .dropTableIfExists('ratingsOW')
        .dropTableIfExists('jobs')
        .dropTableIfExists('clientCars')
        .dropTableIfExists('cars')
        .dropTableIfExists('clients')
        .dropTableIfExists('washers');
};

