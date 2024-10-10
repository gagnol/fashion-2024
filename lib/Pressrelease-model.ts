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
    enum: ['prensa', 'television', 'radio', 'digital'],
    required: true,
  },
  topic: {
    type: String,
    enum: ['politica', 'economia', 'tecnologia', 'cultura'],
    required: true,
  },
  location: {
    type: String,
    enum: ['local', 'nacional', 'internacional'],
    required: true,
  },
  reach: {
    type: String,
    enum: ['pequeno', 'mediano', 'grande'],
    required: true,
  },
  distributionDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sent'],
    default: 'draft',
  },
});

const PressRelease = mongoose.models.PressRelease || mongoose.model('PressRelease', pressReleaseSchema);
export default PressRelease;
