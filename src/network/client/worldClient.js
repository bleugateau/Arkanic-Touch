import ProtocolRequired from "../../protocol/messages/ProtocolRequired";
import HelloGameMessage from "../../protocol/messages/HelloGameMessage";
import {HandlerManager} from "../../managers/handlerManager";
import {WorldManager} from "../../managers/worldManager";

export default class WorldClient {
    constructor(spark) {
        this.spark = spark;
        this.account = null;
        this.activeCharacter = {};
    }

    initialize(){
        this.spark.on('data', (message) => {
            if(message.call){
                switch(message.call){
                    case 'connecting':
                        this.spark.write(new ProtocolRequired(1594, 1592));
                        this.spark.write(new HelloGameMessage());
                        break;
                    case 'sendMessage':
                        const { data } = message;

                        if(data){
                            HandlerManager.intercept(this, data);
                        }
                        break;
                    case 'reconnecting':
                        this.spark.end();
                        break;
                    default:
                        console.log(message);
                        break;
                }
            }
        });

        this.spark.on('end', () => {
            WorldManager.removeClient(this);
        });
    }
}