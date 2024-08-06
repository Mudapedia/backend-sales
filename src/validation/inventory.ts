import Joi from "joi";
import { InventoryAdd } from "../types/requestBody/inventory";

class Schema {
  protected static get schemaInventoryAdd() {
    return Joi.object({
      nama_produk: Joi.string().trim().required(),
      qty_gudang: Joi.number().required(),
      qty_sales: Joi.number().required(),
    });
  }
}

class InventoryValidation extends Schema {
  static add(body: InventoryAdd) {
    return this.schemaInventoryAdd.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default InventoryValidation;
