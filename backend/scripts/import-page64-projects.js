require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { v2: cloudinary } = require('cloudinary')
const Project = require('../models/Project')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function main() {
  const root = path.resolve(__dirname, '..', '..')
  const manifestPath = path.join(root, 'tmp', 'page64-projects', 'manifest.json')
  const projects = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  await mongoose.connect(process.env.MONGODB_URI)

  const previous = await Project.find({}).lean()
  fs.writeFileSync(path.join(root, 'tmp', 'page64-projects', 'previous-projects-backup.json'), JSON.stringify(previous, null, 2))

  const prepared = []
  for (let index = 0; index < projects.length; index += 1) {
    const project = projects[index]
    const publicId = `page-${project.sourcePages[0]}-${project.slug}`
    const upload = await cloudinary.uploader.upload(project.localImage, {
      folder: 'ahsan-portfolio/projects-page64',
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    })
    const image = { url: upload.secure_url, publicId: upload.public_id, alt: `${project.title} main render` }
    delete project.localImage
    prepared.push({
      ...project,
      slug: `${project.slug}-page-${project.sourcePages[0]}`,
      thumbnail: image.url,
      images: [image],
    })
    console.log(`${index + 1}/${projects.length} uploaded ${project.title}`)
  }

  await Project.deleteMany({})
  await Project.insertMany(prepared)
  console.log(`Imported ${prepared.length} projects`)
  await mongoose.disconnect()
}

main().catch(async (error) => {
  console.error(error)
  await mongoose.disconnect().catch(() => {})
  process.exit(1)
})
