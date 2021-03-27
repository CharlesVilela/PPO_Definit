import { json } from 'body-parser';
import {Schema, Document, model} from 'mongoose';

const CanalSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        enum: {
            caracteres: String,
            inteiros: Number,
            boleano: Boolean
        }
    },
    historico: {
        type: Boolean,
        default: false,
    },
    leituraOuEscrita: {
        type: String,
        required: true
    },
    topicos: [{
        type: Schema.Types.ObjectId,
        ref: 'Topico',
        required: false
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

export default model('Canal', CanalSchema);