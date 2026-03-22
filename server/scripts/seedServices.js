import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/Service.js";
import services from "../../shared/services.js";

dotenv.config();

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