var Schema = mongoose.Schema;

var brukerSchema = new Schema({
    "brukernavn": {
        type: String,
        required: true,
    },
    "lagrede": {
        type: Array,
        required: false,
    }
    }, { timestamps: true });

var Bruker = mongoose.model("Bruker", brukerSchema);

module.exports = Bruker;