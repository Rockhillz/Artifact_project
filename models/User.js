const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },

    address: { type: String, required: true },

    email: { type: String, required: true, unique: true, lowercase: true},

    password: { type: String, required: true },

    profilePicture: { type: String, default: '' },

    role: { type: String, enum: ['user', 'admin'], default: 'user' },

    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork'  
    }],

    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork'
    }],

    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork'
    }]

    },
    { timestamps: true
    });

    // hash password before saving
    UserSchema.pre('save', async function (next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        } catch (error) {
            next(error);
        }
    });

    module.exports = mongoose.model("User", UserSchema);
