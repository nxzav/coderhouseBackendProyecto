import mongoose from 'mongoose';

const TicketModel = mongoose.model('tickets', new mongoose.Schema({
    code: { type: String, required: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    items: [
      { type: Object, required: [true, 'La propidad items es obligatoria'] },
    ],
  })
);

export default TicketModel;
