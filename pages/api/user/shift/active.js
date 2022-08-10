import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function userShiftActive(req, res) {
  if (!req.body.email) return res.status(400).json('Invalid request.')
  
  await prisma.$connect()

  res.status(200).json(await prisma.shifts.findFirst({where: {
    email: req.body.email,
    isActive: true
  }}))

  await prisma.$disconnect()
}
