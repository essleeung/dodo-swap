import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'

import {ItemInterface} from './item'
import {EventInterface} from './event'
import {RatingInterface} from './rating'


// Create User interface extending mongoose.Document (which includes ._id)
export interface UserInterface extends mongoose.Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    userName: string;
    islandName: string;
    nativeFruit: string;
    pic: string; 
    ratings: RatingInterface[];
    inventory: ItemInterface[];
    wishList: ItemInterface[];
    friends: UserInterface[];
    events: EventInterface[];
    validPassword(user: UserInterface, password: string): boolean;
}

//Create user schema
let userSchema: mongoose.Schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8
    }, 
    userName: String,
    islandName: String,
    nativeFruit: String,
    pic: {
        type: String,
        default: '/wilbur_dodo.png'
    },
    ratings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}],
    inventory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    wishList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]


})
//hash the passwords
userSchema.pre('save', function(this: UserInterface, done) {
    //only hash it if it's a new password, not if it's modified this refers to the userObject(schema)
    if(this.isNew) {
        this.password = bcrypt.hashSync(this.password, 12)
    }
    //indicate that we're okay to move on (to insert into DB)
    done()

})

//Make a JSON representation of the user (for sending on the JWT payload)
userSchema.set('toJSON', {

    transform: (doc: any, user: UserInterface) => {
        console.log('TRANSFORM!')
        delete user.password
        delete user.__v 
        return user
    }
})

//Make a function that compares passwords
userSchema.methods.validPassword = function(user: UserInterface, typedPassword: string): boolean {
    //typedPassword: plain text, just typed in by user
    //this.password: existing, hashed password
    return bcrypt.compareSync(typedPassword, user.password)
}

// Create model with type user and export user model
export default mongoose.model<UserInterface>('User', userSchema)
