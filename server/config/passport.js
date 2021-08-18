const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { fetchUserByEmail, fetchManagerById } = require('../services/users-service')

passport.use(
    'login',
    new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        const user = await fetchUserByEmail(email);
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        const match = await bcrypt.compare(password, user.pwd_hash)

        if (!match) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
}))

passport.use(
    'jwt-customer',
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
          return done(null, token.user);
      }
    )
  );

  passport.use(
    'jwt-manager',
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true
      },
      async (req, token, done) => {
        const  { facilityId } = req.params
        const { id: userId } = token.user
        const facilityManager = await fetchManagerById(facilityId, userId)
        // If user is not manager of facility - don't allow access
        if (!facilityManager) {
          return done(null, false, { message: 'No manager access.' });
        }
        return done(null, token.user);
      }
    )
  );