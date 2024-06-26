import mongoose from 'mongoose';

let isConnected = false; // variable to track the connection status.

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(!process.env.MONGODB_URI) return console.log('La URI de la base de datos no está definida');

  if (isConnected) {
    console.log('=> usando la conexión existente');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('MongoDB conectado');
  } catch (error: any) {
    console.log(error)
  }

}
