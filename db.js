const mongoose = require('mongoose');

const HesapSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    hesap_kodu: String,
    hesap_adi: String,
    tipi: String,
    ust_hesap_id: Number,
    borc: Number,
    alacak: Number,
    borc_sistem: Number,
    alacak_sistem: Number,
    borc_doviz: Number,
    alacak_doviz: Number,
    borc_islem_doviz: Number,
    alacak_islem_doviz: Number,
    birim_adi: String,
    bakiye_sekli: Number,
    aktif: Number,
    dovizkod: Number
});

const Hesap = mongoose.model('Hesap', HesapSchema);

async function saveData(veriler) {
    for (const entry of veriler) {
        await Hesap.updateOne(
            { id: entry.id },
            { $set: entry },
            { upsert: true }
        );
    }
}

mongoose.connect('mongodb://localhost:27017/hesapdb', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { saveData, Hesap };