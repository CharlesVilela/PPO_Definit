import { Document, Schema, model, Types } from 'mongoose';

const GrupoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    dispositivos: [{
        type: Schema.Types.ObjectId,
        ref: 'Dispositivo'
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    dataHoraRegistro: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export default model('Grupo', GrupoSchema);