const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//connect to database

mongoose.connect(DB)
        .then(() => console.log('DB connection successful!'))

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});