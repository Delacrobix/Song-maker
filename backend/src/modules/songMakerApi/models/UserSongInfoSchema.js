// import mongoose, { model, Schema } from 'mongoose';

// /**
//  * This model is used to save the information about one user song that will be displayed on the community song list page
//  */
// const UserSongInfoSchema = new Schema({
//   owner: {
//     type: String,
//   },
//   songName: {
//     type: String,
//     required: true,
//   },
//   rhythm: {
//     type: String,
//     required: true,
//   },
//   chords: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//   },
//   refId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Song',
//     required: true,
//   },
// });

// export default model('UserSongInfo', UserSongInfoSchema);
