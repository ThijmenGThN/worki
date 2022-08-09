import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function userShiftToggle(req, res) {
  await prisma.$connect()

  const isActive = await prisma.shifts.findFirst({where: {
    email: req.body.email,
    isActive: true
  }})

  let data

  if (isActive) {
    await prisma.shifts.update({
      where: {
        id: isActive.id
      },
      data: {
        isActive: false,
        end: new Date().toISOString()
      }
    })
  } else {
    data = await prisma.shifts.create({
      data: {
        email: req.body.email,
        isActive: true,
        start: new Date().toISOString(),
        end: null
      }
    })
  }

  res.status(200).json(data)

  await prisma.$disconnect()
}
