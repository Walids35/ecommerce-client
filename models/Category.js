//Not yet put inside database(need to test simpler),but I think this is how the model will look like
import mongoose, {model, models, Schema} from "mongoose";

const CategorySchema = new Schema({
  name: {type:String,required:true},
  parent: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: [{type:Object}]
});

export const Category = models?.Category || model('Category', CategorySchema);