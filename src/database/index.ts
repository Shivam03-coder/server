import mongoose from "mongoose";

async function Dbconnect(Uri: string): Promise<any> {
  try {
    await mongoose.connect(Uri);
    console.log("DataBase connected succesfully");

    // Event listener for successful connection
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
    });

    // Event listener for connection error
    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    // Event listener for disconnection
    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from MongoDB");
    });
  } catch (error) {
    console.log("Mongoose disconnected from MongoDB", error);
    process.exit(1);
  }
}

export default Dbconnect;
