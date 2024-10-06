import mongoose from 'mongoose';

export type Slider = {
  _id:string,
  text:string ,
  image: string,
  link:string
}

const sliderSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    image: {type: String, required: true},
    link:{ type: String, required: true }
  },
  {
    timestamps: true,
  }
  );

  const SliderModel =
  mongoose.models.Slider || mongoose.model('Slider', sliderSchema)
  export default SliderModel