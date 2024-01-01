const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

async function mongo(err) {
  await mongoose.connect('mongodb://localhost:27017/CHAT', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log('database connected successfully');
}
mongo().catch((err) => console.log(err));

module.exports = mongoose; 
 