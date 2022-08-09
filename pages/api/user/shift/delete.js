import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function userShiftActive(req, res) {
  await prisma.$connect()

  await prisma.shifts.delete({
    where: {
      id: req.body.id
    }
  })

  res.status(200).json({})

  await prisma.$disconnect()
}
