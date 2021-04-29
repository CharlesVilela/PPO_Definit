import { Request, Response } from "express";
import mqtt from "mqtt";
import statusCode from "../config/statusCode";
import Broker from "../model/Broker";

import Topico from '../model/Topico';
import Dispositivo from '../model/Dispositivo';
import Canal from "../model/Canal";

class BrokerServiceConectar {

    public async conectar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { numeroIp, topico } = req.body;
            const broker = await Broker.findOne({ numeroIp: numeroIp, usuario: id });
            const topic = await Topico.findOne({ nome: topico, usuario: id });

            if (broker == null) return res.status(statusCode.bad).send('Não foi possivel conectar ao broker, Broker não encontrado!');
            if (topic == null) return res.status(statusCode.bad).send('Não foi possivel conectar ao broker, Topico não encontrado!');

            const opitions = {
                porta: broker.porta,
                host: broker.numeroIp,
                QoS: broker.qos,
                clean: broker.clean,
                rejeitarUnauthorized: true,
                protocolo: mqtt
            }

            const client = mqtt.connect(opitions);
            client.publish(topic.id, topic.mensagem);
            return res.status(statusCode.success).send('Conectado!')

        } catch (error) {
            return res.status(statusCode.error).send('Ocorreu um error ao conectar ao Broker!');
        }
    }

    public async Subscriber(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nomeTopico } = req.body;
            const topico = await Topico.findOne({ nome: nomeTopico });

            if (topico == null) return res.status(statusCode.bad).send('Não foi encontrado nenhum topico para se inscreer!');

            await Dispositivo.findByIdAndUpdate(id, { $push: { inscricoes: topico.id } });

            return res.status(statusCode.success).send("Inscrição realizada com sucesso!");
        } catch (error) {
            return res.status(statusCode.error).send('Ocorreu um error ao subscrever no Topico!');
        }
    }

    public async Publisher(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { mensagem } = req.body;

            const topico = await Topico.findByIdAndUpdate(id, { $set: { mensagem: mensagem } });

            if(topico == null)  return res.status(statusCode.not_found).send('Ocorreu um Topico não encontrado para publicar!');

            const canal = await Canal.findOne({ topicos: topico.id });

            if(canal == null){
                return res.status(statusCode.not_found).send('Canal não encontrado para publicar!');
            }else {
                if(canal.historico == true){
                    
                    const historicoPublicacaoCanal = {
                        topico: topico.nome,
                        mensagem: mensagem
                    }
                    await Canal.findOneAndUpdate({ nome: canal.nome }, { $push: { historicoPublicacao: historicoPublicacaoCanal } });
                }
            }
            return res.status(statusCode.success).send('Publicação realizada com sucesso!');
        } catch (error) {
            return res.status(statusCode.error).send('Ocorreu um error ao publicar no Topico!');
        }
    }
}

export default new BrokerServiceConectar();