const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { fetchUserByEmail, fetchManagerById, fetchUserById } = require('../services/users-service')

/*
Easy way to generate key on Linux using crypto:
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
*/

passport.use(
    'login',
    new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
          const user = await fetchUserByEmail(email);
          if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
          }

          const match = await bcrypt.compare(password, user.pwd_hash)

          if (!match) {
            return done(null, false, { message: 'Incorrect email or password.' });
          }

          if (!user.active) {
            return done(null, false, { message: 'This email address has not been verified. Check your inbox for a welcome email and verification link.' });
          }

          return done(null, user, { message: 'Logged in Successfully' });
        } catch(err) {
            return done(null, false, { message: 'There was a problem logging in.' });          
        }
}))

passport.use(
  'jwt-refresh',
  new JWTstrategy(
    {
      secretOrKey: process.env.REFRESH_AUTH_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies)
          {
              token = req.cookies['SB_REFR']
          }
          return token;
      }])
    },
    async (token, done) => {
      const user = await fetchUserById(token.user.id)
      if (!user) {
        return done(null, false, { message: 'No user found associated with token.' });
      }
      return done(null, user, { message: 'Token refreshed' });
  }
))

passport.use(
    'jwt-customer',
    new JWTstrategy(
      {
        secretOrKey: process.env.AUTH_SECRET,
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
        secretOrKey: process.env.AUTH_SECRET,
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