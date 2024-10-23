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
    enum: ['Política',
      'Economía',
      'Sociedad',
      'Internacionales',
      'Deportes',
      'Espectáculos',
      'Culturales',
      'Eventos'
      ],
    required: true,
  },
  location: {
    type: String,
    enum: ["Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
  "Ciudad Autónoma de Buenos Aires"
],
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
    enum: ['Borrador', 'scheduled', 'Enviado'],
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
