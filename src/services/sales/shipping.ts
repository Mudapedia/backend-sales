import mongoose from "mongoose";
import OwnerCol from "../../models/owner";

export const salesShippingService = (id: string) => {
  return OwnerCol.aggregate([
    { $unwind: "$sales" },
    { $match: { "sales._id": new mongoose.Types.ObjectId(id) } },
    { $project: { _id: 0, shipping: "$sales.shipping" } },
  ]);
};

export const updateStatusShippingService = (
  id: string,
  idShipping: string,
  status: string
) => {
  return OwnerCol.updateOne(
    {
      "sales._id": new mongoose.Types.ObjectId(id),
      "sales.shipping._id": new mongoose.Types.ObjectId(idShipping),
    },
    {
      $set: { "sales.$[outer].shipping.$[inner].status": status },
    },
    {
      arrayFilters: [
        { "outer._id": new mongoose.Types.ObjectId(id) },
        { "inner._id": new mongoose.Types.ObjectId(idShipping) },
      ],
    }
  );
};
