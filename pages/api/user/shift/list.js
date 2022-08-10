import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function userShiftActive(req, res) {
  if (!req.body.email) return res.status(400).json('Invalid request.')

  await prisma.$connect()

  let data = await prisma.shifts.findMany({
    where: {
      email: req.body.email,
      isActive: false
    }, 
    orderBy: [{id: 'asc'}]
  })

  data = data.slice(0, 6).reverse()

  res.status(200).json(data)

  await prisma.$disconnect()
}
