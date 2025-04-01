// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Crear una instancia única de PrismaClient
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // En producción, no queremos crear una nueva instancia en cada solicitud
  prisma = new PrismaClient();
} else {
  // En desarrollo, PrismaClient puede ser compartido entre las solicitudes
  // Asegurarse de no crear una nueva instancia cada vez
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Exporta la instancia de PrismaClient
export default prisma;
