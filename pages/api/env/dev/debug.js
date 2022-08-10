
export default async function envDevDebug(req, res) {
  res.status(200).json(process.env.DEV_DEBUG)
}
