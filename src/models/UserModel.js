import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const User = new Schema({
    // accountId: { type: Schema.Types.ObjectId, required: true, ref: 'account' },
    name:{type: String},
    email: {type: String, unique: true},
    password: {type: String},
    address: {type:String},
    phone: {type: String},
    isAdmin: {type: Boolean}
},
{
    timestamps: true,
  },
)

export const UserModel = mongoose.model('User', User)