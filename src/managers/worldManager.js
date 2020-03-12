import WorldClient from "../network/client/worldClient";

var isInitialized = false;

var worldClientsList = [];
var breedHeads = [];

export const WorldManager = {
    /**
     * @param {WorldClient} client
     */
    addClient: (client) => {
        if(client instanceof WorldClient){
            worldClientsList.push(client);
        }
    },
    /**
     * @param {WorldClient} client
     */
    removeClient: (client) => {
        console.log(worldClientsList.length);

        worldClientsList = worldClientsList.filter(x => x.spark !== client.spark);

        console.log(worldClientsList.length);
    },
    debug: () => {
        console.log(`${worldClientsList.length} client connected :O`);
    }
};