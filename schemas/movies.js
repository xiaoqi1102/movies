/**
 * Created by xiaoqi on 16/8/14.
 */
var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    summary: String,
    flash: String,
    poster: String,
    year: String,
    country:String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

MovieSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

MovieSchema.statics = {
    fetch: function (obj={},cb) {
        console.log('obj:',obj);
        return this
            .find(obj)
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    },
};

module.exports = MovieSchema;