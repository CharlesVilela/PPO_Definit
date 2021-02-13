import { request, Request, Response } from "express";
import mosca from "mosca";
import mqtt, { Packet } from "mqtt";
import statusCode from "../config/statusCode";
import Broker from "../model/Broker";

const conectar = async (req: Request, res: Response) => {
    try {
        const { porta } = req.body;
        const buscarBroker = await Broker.findOne({ porta: porta });

        if (buscarBroker == null) return res.status(statusCode.bad).send("Broker não encontrado!");

        let setting = { port: buscarBroker.porta };
        let broker = new mosca.Server(setting);

        broker.on('ready', () => {
            return res.status(statusCode.success).send("Broker ready!")
        })

        const outroPackage = { package: mosca };
        broker.on('published', (outroPackage) => {
            const message = outroPackage.payload.toString();
            return res.json(message);
        })
    } catch (error) {
        return res.status(statusCode.error).send('Error ao conectar!');
    }
}

export default conectar;