/**
 * Created by max on 1/20/16.
 */

var connectionString = process.env.DATABASE_URL || 'postgres://max-atm:max-atm@localhost:5432/max-atm';

module.exports = connectionString;