
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('users', user => {
        user.increments('id');
        user.string('accountType',128).notNullable();
        user.string('email', 128)
            .notNullable()
            .unique();
        user.string('password', 128).notNullable();
        user.string('firstName', 128).notNullable();
        user.string('lastName', 128).notNullable();
        user.string('phoneNumber', 25).notNullable();
        user.string('stripeUUID', 128).unique();
        user.string('streetAddress', 400).notNullable();
        user.string('streetAddress2', 400);
        user.string('city', 400).notNullable();
        user.string('state', 400).notNullable();
        user.string('zip', 400).notNullable();
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
        .dropTableIfExists('users');
};

