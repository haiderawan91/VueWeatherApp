// const express = require('express');
// const dotenv = require('dotenv');
// const sequelize = require('./config/database');
// const routes = require('./routes');
// const cors = require('cors');
// const cookieParser = require("cookie-parser");
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('./models/User'); // Assuming User model is defined

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 3000;

// // Configure Passport to use LocalStrategy
// passport.use(new LocalStrategy({
//     usernameField: 'email', // Specify email as the username field
//   },
//   async (email, password, done) => {
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return done(null, false, { message: 'User not found' });
//       }
//       const isValidPassword = await user.isValidPassword(password);
//       if (!isValidPassword) {
//         return done(null, false, { message: 'Incorrect password' });
//       }
//       return done(null, user); // Authentication successful
//     } catch (error) {
//       return done(error);
//     }
//   }
// ));

// // Serialize and deserialize user
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });

// // Initialize Passport
// app.use(passport.initialize());

// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from this origin
//   exposedHeaders: 'Authorization',
// }));
// app.use(routes);

// sequelize.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// }).catch((err) => {
//   console.error('Unable to connect to the database:', err);
// });
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Configure Passport
passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
app.use(cors({
  origin: 'http://localhost', // your frontend URL
  // origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // <- this is important
}));
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Retry connection function
const startServerWithRetry = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connection established');
      await sequelize.sync();

      app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
      });

      break; // Exit loop on success
    } catch (err) {
      console.error(`❌ DB connection failed. Retries left: ${retries - 1}`);
      console.error(err.message);
      retries--;
      if (retries === 0) {
        console.error('💥 All retries exhausted. Exiting...');
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

startServerWithRetry();
