import { Request, Response } from "express";
import mosca from "mosca";
import mqtt, { Packet } from "mqtt";
import statusCode from "../config/statusCode";
import Broker from "../model/Broker";
import Topico from "../model/Topico";


class PubService {

    public async Pubscriber( req: Request, res: Response){

        const { id } = req.params;
        const { porta, nomeTopico, message } = req.body;

        const topico = await Topico.findOne({ nome: nomeTopico, usuario: id });

        const broker = await Broker.findOne({ porta: porta, usuario: id });

        if(topico == null) return res.status(statusCode.bad).send('Broker não encontrado!');
        if(broker == null) return res.status(statusCode.bad).send('Broker não encontrado!');

       const client = mqtt.connect(broker.numeroIp);

        client.on('connect', () => {
            setInterval(() => {
                client.publish(topico.nome, message)
            }, 5000)
        })
    }

}

export default PubService;
