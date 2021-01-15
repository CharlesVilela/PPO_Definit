import { Request, Response } from 'express';
import mqtt from 'mqtt';
import { prototype } from 'nodemailer/lib/dkim';
import statusCode from '../config/statusCode';

import Broker from '../model/Broker';
import Dispositivo from '../model/Dispositivo';
import Topico from '../model/Topico';

interface Broker {
    id: string;
    numeroIp: string;
    porta: number;
    clean: boolean;
    payload: string;
    qos: mqtt.QoS;
    retain: boolean;
    usuario: string;
}

class ConectarBroker {

    public async Conectar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { numeroIp } = req.body;
            const broker = await Broker.findOne({ numeroIp: numeroIp, usuario: id });

            if (broker == null) return res.status(statusCode.bad).send('Não foi possivel conectar ao broker, Broker vazio');

            const opitions = {
                porta: broker.porta,
                host: broker.numeroIp,
                QoS: broker.qos,
                clean: broker.clean,
                rejeitarUnauthorized: true,
                protocolo: mqtt
            }

            const client = mqtt.connect(opitions);

            return res.status(statusCode.success).send("Chegou aqui antes do metodo");

        } catch (error) {
            return res.status(statusCode.error).send('Ocorreu um error ao conectar ao Broker!');
        }
    }

    public async Subscriber(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nomeTopico } = req.body;
            const topico = await Topico.findOne({ nome: nomeTopico });

            await Dispositivo.findByIdAndUpdate(id, { $push: { inscricoes: topico } });

            if (topico == null) return res.status(statusCode.bad).send('Não foi encontrado nenhum topico para se inscreer!');

            return res.status(statusCode.success).send("Inscrição realizada com sucesso!");
        } catch (error) {
            return res.status(statusCode.error).send('Ocorreu um error ao subscrever no Topico!');
        }
    }

    public async Publisher(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { mensagem } = req.body;
            const topico = await Topico.findByIdAndUpdate(id, { $push: { mensagem: mensagem } });

            return res.status(statusCode.success).json(topico);
        } catch (error) {
            return res.status(statusCode.error).send('Ocorreu um error ao publicar no Topico!');
        }
    }
}

export default new ConectarBroker;