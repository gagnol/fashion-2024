import mongoose, { Schema, Document } from 'mongoose';

interface ICommunicationOfficer extends Document {
  name: string;
  email: string;
  sector: string;
  organization: string;
  specialization: string;
  experience: number;
  location: string;
  bio: string;
}

const CommunicationOfficerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  sector: { type: String, enum: ['empresarial', 'publico', 'ong', 'asociacion'], required: true },
  organization: { type: String, required: true },
  specialization: { type: String, enum: ['corporativa', 'crisis', 'digital', 'rse'], required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  bio: { type: String },
});

export default mongoose.models.CommunicationOfficer || mongoose.model<ICommunicationOfficer>('CommunicationOfficer', CommunicationOfficerSchema);
