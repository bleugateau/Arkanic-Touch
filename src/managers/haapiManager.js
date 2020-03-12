import Account from "../database/models/account";
import uuidAPIKey from "uuid-apikey";

export const HaapiManager = {
    createKey: async (payload) => {

        if (payload.length !== 3 || !Array.isArray(payload)) {
            return null;
        }

        let login = payload[0].split('=')[1];
        let password = payload[1].split('=')[1];

        if (login === undefined || password === undefined) {
            return null;
        }

        let accounts = await Account.query()
            .select('*')
            .where('login', '=', login)
            .execute();


        if (accounts[0] instanceof Account) {
            let account = accounts[0];

            if (password === account.password) {

                let apikey = uuidAPIKey.create().apiKey;
                let keyExpiration = new Date();
                keyExpiration.setHours(4);

                console.log(`Create ApiKey ${apikey} for ${login} :)`);

                await Account.query().findById(account.account_id).patch({
                    apikey: apikey,
                    apikey_expiration_date: keyExpiration
                }).execute();

                account.apikey = apikey;
                account.apikey_expiration_date = keyExpiration;

                return account;
            }
        }
    },
    buildToken: async (apiKey) => {

        const accounts = await Account.query()
            .where('apikey', '=', apiKey);

        if (accounts[0] instanceof Account) {
            let token = uuidAPIKey.create().uuid;
            await Account.query().findById(accounts[0].account_id).patch({token: token}).execute();

            return token;
        }

        return null;
    }
};