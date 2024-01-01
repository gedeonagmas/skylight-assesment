const passport = require('passport');
exports.authentication = passport.authenticate('jwt', { session: false });

 
 