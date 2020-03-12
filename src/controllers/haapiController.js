import {HaapiAuthentificationEnum} from "../protocol/enums/haapiAuthentificationEnum";
import Account from "../database/models/account";
import uuidAPIKey from "uuid-apikey";
import {HaapiManager} from "../managers/haapiManager";

export default class HaapiController {
    static createApiKey(req, res) {
        //decode buffer
        req.on('data', (chunk) => {
            let bufferPayload = Buffer.concat([chunk]).toString();
            let credentials = bufferPayload.split('&');

            HaapiManager.createKey(credentials, res).then((response) => {

                if(response instanceof Account){

                    return res
                        .status(200)
                        .send({
                            "key": response.apikey,
                            "account_id": response.account_id,
                            "ip": "90.65.157.4",
                            "added_date": new Date(),
                            "meta": [],
                            "data": {"country": "FR", "currency": "EUR"},
                            "access": [],
                            "refresh_token": "1dec683c-c155-4b27-afa3-b7badf17801e",
                            "expiration_date": response.apikey_expiration_date
                        });
                }


                return res
                    .status(601)
                    .send({reason: HaapiAuthentificationEnum.WRONG_CREDENTIALS});
            });
        });
    }

    ///haapi/Account/CreateToken API_KEY on HEADER
    static createToken(req, res) {

        if(!req.headers.apikey){
            return res
                .status(601)
                .send({reason: HaapiAuthentificationEnum.WRONG_CREDENTIALS});
        }

        HaapiManager.buildToken(req.headers.apikey).then((token) => {
            return res
                .status(200)
                .send({"token": token});
        });
    }
};