import mongoose from 'mongoose'

const state = global.mongooseConnection || { connection: null, promise: null }
global.mongooseConnection = state

export async function connectDB() {
  if (state.connection) return state.connection
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured')

  if (!state.promise) {
    state.promise = mongoose
      .connect(process.env.MONGODB_URI, { bufferCommands: false })
      .then((instance) => instance)
  }
  state.connection = await state.promise
  return state.connection
}
