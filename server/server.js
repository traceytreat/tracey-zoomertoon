const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const postRouter = require('./routes/post.router');
const replyRouter = require('./routes/reply.router');
const pointsRouter = require('./routes/points.router');
const userDetailsRouter = require('./routes/userdetails.router');
const lovesRouter = require('./routes/loves.router');
const lovesAllRouter = require('./routes/lovesall.router');
const statsRouter = require('./routes/stats.router');
const awardsRouter = require('./routes/awards.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/reply', replyRouter);
app.use('/api/points', pointsRouter);
app.use('/api/userdetails', userDetailsRouter);
app.use('/api/loves', lovesRouter);
app.use('/api/lovesall', lovesAllRouter);
app.use('/api/stats', statsRouter);
app.use('/api/awards', awardsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
