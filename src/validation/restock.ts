import Joi from "joi";
import { typeRestock } from "../types/requestBody/restock";

class schema {
  protected static get schemaRestockAdd() {
    return Joi.object({
      list_produk: Joi.array().items(
        Joi.object({
          id_produk: Joi.string().trim().required(),
          kode_produk: Joi.string().trim().required(),
          nama_produk: Joi.string().trim().required(),
          qty: Joi.number().required(),
        })
      ),
    });
  }
}

class RestockValidation extends schema {
  static add(body: typeRestock) {
    return this.schemaRestockAdd.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default RestockValidation;
