import { Request, Response } from "express";
import mosca from "mosca";
import mqtt, { Packet } from "mqtt";
import statusCode from "../config/statusCode";
import Broker from "../model/Broker";
import Topico from "../model/Topico";


class SubService {

    public async Subscriber( req: Request, res: Response){

        const { id } = req.params;
        const { porta, nomeTopico } = req.body;

        const topico = await Topico.findOne({ nome: nomeTopico, usuario: id });

        const broker = await Broker.findOne({ porta: porta, usuario: id });

        if(topico == null) return res.status(statusCode.bad).send('Broker não encontrado!');
        if(broker == null) return res.status(statusCode.bad).send('Broker não encontrado!');


       const client = mqtt.connect(broker.numeroIp);

       const nome = topico.nome;
        client.on('message', (nome, message) => {
            const mensagem = message.toString();
            return res.status(statusCode.success).json(mensagem);
        });

        client.on('connect', () => {
            client.subscribe(topico.nome);
        })
    }

}

export default SubService;
