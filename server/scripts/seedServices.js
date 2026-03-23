import mongoose from "mongoose";
import Service from "../models/Service.js";
import services from "../../shared/services.js";

if (process.env.NODE_ENV !== "production") {
  import('dotenv').then(dotenv => dotenv.config());
}

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Service.deleteMany();
    await Service.insertMany(services);

    console.log("Services seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();