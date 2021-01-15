import {Request, Response} from 'express';
import { QoS } from 'mqtt';
import Broker from '../model/Broker';

interface Broker {
        numeroIp: string;
        porta: number;
        clean: boolean;
        payload: string;
        qos: QoS;
        retain: boolean;
        usuario: string;   
}

class Teste{

   public async conectar(req: Request, res: Response){

    const { id } = req.params;

    const broker = await Broker.findById(id);

        if(broker != null){
            this.publicar(broker);
        }
    
    


   }
   
    public async publicar( { numeroIp, porta,clean, 
        payload, qos, retain, usuario }: Broker ) {
        
            return numeroIp;

    }

}