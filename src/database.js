import mongoose from 'mongoose';

export function connectToDatabase() {
  mongoose.connect('mongodb+srv://gurbinaia:yZKkn43U153UYvPw@ecommerce.uguwr0z.mongodb.net/ecommerce', (error) => {
    if (error) {
      console.log('Cannot connect to database: ' + error);
      process.exit();
    }
  });
}