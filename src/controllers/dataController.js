import en from "../../dist/dictionary/en";
import fr from "../../dist/dictionary/fr";
import axios from "axios";
import fs from "fs";
import path from "path";

export default class DataController {
    //data/dictionary
    static getDictionary(req, res) {
        let result = en;
        switch (req.query.lang) {
            case 'fr':
                result = fr;
                break;
        }

        return res
            .status(200)
            .send(result)
    }

    //data/map
    static getDataMap(req, res) {
        res.setHeader('Content-Type', 'application/json');

        if (req.body.class === undefined) {
            return res
                .status(401)
                .send({message: `Bad request`});
        }

        if (fs.existsSync(path.resolve(__dirname, `../../dist/map/${req.body.class}.json`))) {
            let requestedJson = fs.readFileSync(path.resolve(__dirname, `../../dist/map/${req.body.class}.json`));

            //find object from requested ids
            if (req.body.ids && Array.isArray(req.body.ids)) {
                let jsonRaw = JSON.parse(requestedJson);

                if (jsonRaw) {
                    let jsonRequestedIds = Object.assign({}, ...req.body.ids.map(key => ({[key]: jsonRaw[key]})));

                    return res
                        .status(200)
                        .send(jsonRequestedIds);
                }
            }

            return res
                .status(200)
                .send(requestedJson);
        }

        //do request for find .json file
        axios.post('https://proxyconnection.touch.dofus.com/data/map', {
            class: req.body.class
        }).then((response) => {
            console.log(`${req.body.class} grabbed !`);
            fs.writeFileSync(path.resolve(__dirname, `../../dist/map/${req.body.class}.json`), JSON.stringify(response.data));
        });

        return res
            .status(404)
            .send({message: `Unknow ${req.body.class}.json !`});
    }
}