import Properties from "../../properties";
import Database from "../../classes/Database_Manage_Film_Example_db";
import Errors from "../../classes/Errors";

// Factom
import Factom from "factom-harmony-connect"
import sha256 from 'sha256';
import canonicalize from 'canonical-json';

const factomConnectSDK = new Factom(Properties.factom.config);

export default {

  /**
  * EntryModel.create
  * @param chainId
  * @param signerPrivateKey
  * @param signerChainId
  * @param content
  * @param chain
  * @description CRUD ACTION create
  */
  create: async (chainId, signerPrivateKey, signerChainId, modelContent, chain) => {
    try {
      // Convert the model content into a hash
      const content = sha256(canonicalize(modelContent));
      const entry = await factomConnectSDK.chains.entries.create({
        chainId,
        signerPrivateKey,
        signerChainId,
        content,
      });
      let result = await Database.getConnection().models.Entry.create({
        entry_hash: entry.entry_hash, chain, content
      });
      return result;
    } catch(e) {
      if (e.response.status === 403) {
        throw new Errors.INVALID_AUTH_FACTOM();
      } else if (e.response.status === 429) {
        throw new Errors.EXCEDEED_LIMIT_REQUEST()
      }
    }
  },

  /**
  * EntryModel.list
  * @description CRUD ACTION list
  *
  */
  async list() {
    try {
      let list = await Database.getConnection().models.Entry.findAll();
      return list;
    } catch (e) {
      console.log(e);
    }
  },

};