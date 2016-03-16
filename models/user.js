/**
 * Created by ziten on 3/16/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fName : String,
    lName : String,
    title : String,
    sex : String,
    age : String
});

module.exports = mongoose.model('User', UserSchema);