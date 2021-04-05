import { Schema, Document, model } from 'mongoose';

interface DispositivoInterface extends Document {
    nome: string;
    descricao: string;
    tipo: string
}

const DispositivoSchema = new Schema ({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String,
    },
    caracteristica: {
        type: String
    },
    tipo: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    inscricoes: [{
        type: Schema.Types.ObjectId,
        ref: 'Topico'
    }],
    dataHoraRegistro: {
        type: Date,
        default: Date.now,
        required: true
    }
    //canal: [{}]
});

export default model<DispositivoInterface>('Dispositivo', DispositivoSchema);