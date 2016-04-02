/**
 * Created by Alminin on 26.03.2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

// Validaion function for local srategy properties
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

// Validaion function for local strategy password
var validateLocalStrategyPassword = function(password) {
    return (this.provider !== 'local' || (password && password.length > 6));
};

var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: "",
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
        type: String,
        trim: true,
        default: "",
        validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        default: "",
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    username: {
        type: String,
        unique: 'This userame exists. Try another one.',
        required: 'Please fill in a username',
        trim: true
    },
    password: {
        type: String,
        default: "",
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerData: {},
    additionnalProvidersData: {},
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// pre save method to hash the password
UserSchema.pre('save', function(next) {
    if (this.password && this.password.length > 6) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

// methot for hashing password
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
};

// method for authenticating user
UserSchema.methods.authenticate = function(password) {
    return ths.password === this.hashPasword(password);
};

mongoose.model('User', UserSchema);