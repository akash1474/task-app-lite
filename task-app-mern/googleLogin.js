import Google from 'passport-google-oauth20';
import dotenv from 'dotenv';
import passport from 'passport';
import User from './models/userModel.js';

dotenv.config({ path: './config.env' });

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

const GoogleStrategy = Google.Strategy;
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_SECRET_KEY = process.env.SECRET_KEY;

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_SECRET_KEY,
			callbackURL: '/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, cb) {
			console.log(profile);
			User.findOne({ googleId: profile.id }).then((user) => {
				//No user was found
				if (!user) {
					console.log('Created');
					const verifiedUser = {
						name: profile.displayName,
						email: profile.emails[0].value,
						photo: profile.photos[0].value,
						googleId: profile.id,
						lastname: profile.name.familyName,
					};
					User.create(verifiedUser).then((user) => {
						console.log(user);
						cb(null, user);
					});
				} else {
					console.log('User Available');
					console.log(user);
					cb(null, user);
				}
			});
		}
	)
);
