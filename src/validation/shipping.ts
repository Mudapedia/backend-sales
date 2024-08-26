import Joi from "joi";
import { ShippingType } from "../types/requestBody/shipping";
import { isValidObjectId } from "mongoose";

class schema {
  protected static get schemaAddShipping() {
    return Joi.object({
      list_barang: Joi.array()
        .min(1)
        .items(
          Joi.object({
            id_produk: Joi.string()
              .trim()
              .required()
              .custom((value, helpers) => {
                if (!isValidObjectId(value)) {
                  return helpers.error("id.invalid");
                }
              })
              .messages({
                "id.invalid": "Id invalid",
              }),
            kode_produk: Joi.string().trim().required(),
            nama_produk: Joi.string().trim().required(),
            qty_barang: Joi.number().required(),
          }).required()
        ),
    });
  }
}

class ShippingValidation extends schema {
  static add(body: ShippingType) {
    return this.schemaAddShipping.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default ShippingValidation;
