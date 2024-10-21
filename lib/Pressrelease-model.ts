import mongoose from 'mongoose';

const pressReleaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
  },
  content: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
  },
  mediaType: {
    type: String,
    enum: ['Prensa', 'Televisión', 'Radio', 'Digital'],
    required: true,
  },
  topic: {
    type: String,
    enum: ['Política', 'Economía', 'Tecnología', 'Cultura'],
    required: true,
  },
  location: {
    type: String,
    enum: ['Local', 'Nacional', 'Internacional'],
    required: true,
  },
  reach: {
    type: String,
    enum: ['Pequeno', 'Mediano', 'Grande'],
    required: true,
  },
  distributionDate: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'Enviado'],
    default: 'Enviado',
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
  },
  image: {
    type: String,
    required: false,
  },
},
{
  timestamps: true,
}
);

const PressRelease = mongoose.models.PressRelease || mongoose.model('PressRelease', pressReleaseSchema);
export default PressRelease;
