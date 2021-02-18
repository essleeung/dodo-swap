import mongoose from 'mongoose'
import Event from './event'
import Item from './item'
import User from './user'
import Rating from './rating'


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dodo-swap?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log("CONNECTED!"))
.catch((err) => console.log("MONGOOSE CONNECT ERROR", err))



module.exports.Item = Item
module.exports.Event = Event
module.exports.User = User
module.exports.Rating = Rating

