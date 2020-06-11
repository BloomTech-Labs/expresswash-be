exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("users", (user) => {
      user.increments("id");
      user.string("accountType", 128).notNullable();
      user.string("email", 128).notNullable().unique();
      user.string("password", 128).notNullable();
      user.string("firstName", 128).notNullable();
      user.string("lastName", 128).notNullable();
      user.string("phoneNumber", 25);
      user.string("stripeUUID", 128).unique();
      user.string("streetAddress", 400);
      user.string("streetAddress2", 400);
      user.string("city", 400);
      user.string("state", 400);
      user.string("zip", 400);

      user.string("profilePicture", 400).defaultTo("");
      user.string("bannerImage", 400).defaultTo("");
      user.string("creationDate", 128);
      user.float("userRating", 8, 2);
      user.integer("userRatingTotal").defaultTo(1);
    })
    .createTable("cars", (cars) => {
      cars.increments("carId");
      cars
        .integer("clientId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      cars.string("make", 128).notNullable();
      cars.string("model", 128).notNullable();
      cars.integer("year").notNullable();
      cars.string("color", 60).notNullable();
      cars.string("licensePlate", 10).notNullable();
      cars.string("photo", 400);
      cars.string("category", 128).notNullable();
      cars.string("size", 128).notNullable();
    })
    .createTable("jobs", (jobs) => {
      jobs.increments("jobId");
      jobs.string("washAddress", 128).notNullable();
      jobs.boolean("scheduled").notNullable().defaultTo(true);
      jobs.boolean("completed").notNullable().defaultTo(false);
      jobs.boolean("paid").notNullable().defaultTo(false);
      jobs
        .integer("clientId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      jobs.integer("washerId");
      jobs.string("creationDate", 128).notNullable();
      jobs.integer("carId").notNullable();
      jobs.string("address").notNullable();
      jobs.string("address2");
      jobs.decimal("jobLocationLat", 11, 8);
      jobs.decimal("jobLocationLon", 11, 8);
      jobs.string("city").notNullable();
      jobs.string("state").notNullable();
      jobs.string("zip").notNullable();
      jobs.string("notes");
      jobs.string("jobType").notNullable();
      jobs.string("photoBeforeJob");
      jobs.string("photoAfterJob");
      jobs.string("timeRequested").notNullable();
      jobs.string("timeCompleted");
      jobs.string("dateScheduled");
      jobs.string("timeArrived");
    })
    .createTable("washers", (washer) => {
      washer.increments("washerId");
      washer
        .integer("userId")
        .unique()
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      washer.boolean("workStatus").defaultTo(false);
      washer.decimal("rateSmall", 8, 2);
      washer.decimal("rateMedium", 8, 2).notNullable();
      washer.decimal("rateLarge", 8, 2);
      washer.string("aboutMe", 200);
      washer.decimal("currentLocationLat", 11, 8);
      washer.decimal("currentLocationLon", 11, 8);
      washer.float("washerRating", 8, 2);
      washer.integer("washerRatingTotal").defaultTo(1);
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("washers")
    .dropTableIfExists("jobs")
    .dropTableIfExists("cars")
    .dropTableIfExists("users");
};
