import mongoose from "mongoose";
import OwnerCol from "../models/owner";
import { DataSalesinsert } from "../types/requestBody/sales";

export const getManyInventorySales = (
  id: string,
  query: mongoose.Types.ObjectId[]
) => {
  return OwnerCol.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $unwind: "$sales",
    },
    {
      $project: {
        _id: 1,
        username: 1,
        inventory: 1,
      },
    },
    {
      $match: {
        "sales._id": {
          $in: query,
        },
      },
    },
  ]);
};

export const insertManyInventorySales = (
  id: string,
  idSales: string,
  data: DataSalesinsert[]
) => {
  return OwnerCol.updateOne(
    {
      _id: new mongoose.Types.ObjectId(id),
      "sales._id": new mongoose.Types.ObjectId(idSales),
    },
    {
      $push: {
        "sales.$.inventory": {
          $each: data,
        },
      },
    }
  );
};

// export const updateQtyInventoryAndInventorySales = (
//   id: string,
//   query: Array<object>,
//   inc: any
// ) => {
//   return OwnerCol.bulkWrite([
//     {
//       insertOne : {
//         document : {}
//       }
//     }
//   ])
// };
