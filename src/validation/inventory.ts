import Joi from "joi";
import { InventoryAdd } from "../types/requestBody/inventory";

class Schema {
  protected static get schemaInventoryAdd() {
    return Joi.object({
      kode_produk: Joi.string().trim().required(),
      nama_produk: Joi.string().trim().required(),
      qty_gudang: Joi.number(),
      qty_sales: Joi.number(),
    });
  }

  protected static get schemaInventoryEdit() {
    return Joi.object({
      kode_produk: Joi.string().trim().required(),
      nama_produk: Joi.string().trim().required(),
    });
  }
}

class InventoryValidation extends Schema {
  static add(body: InventoryAdd) {
    return this.schemaInventoryAdd.validateAsync(body, {
      abortEarly: false,
    });
  }
  static edit(body: InventoryAdd) {
    return this.schemaInventoryEdit.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default InventoryValidation;
