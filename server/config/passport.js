const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { fetchUserByEmail } = require('../services/users-service')
const isProduction = process.env.NODE_ENV === 'production'

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
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );