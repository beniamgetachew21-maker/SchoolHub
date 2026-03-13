import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const employees = await prisma.employee.findMany({
    select: {
      employeeId: true,
      employeeCode: true,
      name: true,
      tenantId: true
    }
  })
  console.log('Employees:', JSON.stringify(employees, null, 2))
  
  const tenants = await prisma.tenant.findMany()
  console.log('Tenants:', JSON.stringify(tenants, null, 2))
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
