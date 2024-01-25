import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(
      "mongodb+srv://salma_adnan:Password123@cluster0.pexvdxk.mongodb.net/users?retryWrites=true&w=majority"
    );
  } catch (error) {
    throw error;
  }
};

export default dbConnect;
