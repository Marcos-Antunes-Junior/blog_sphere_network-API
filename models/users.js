module.exports = (mongoose) => {
  const { ObjectId } = mongoose.Schema.Types;
  const Users = mongoose.model(
    "users",
    mongoose.Schema({
      _id: { type: ObjectId, auto: true },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      picture: {
        type: String,
        required: true,
      },
    })
  );
  return Users;
};
