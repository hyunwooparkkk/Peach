import mongoose from 'mongoose';

const PhotoSchema = mongoose.Schema({
  photo: String
});

PhotoSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.photo;
  return result;
};

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;
