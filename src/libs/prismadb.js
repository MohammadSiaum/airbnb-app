import { PrismaClient } from "@prisma/client";

// function global() {
//     var prisma = PrismaClient | undefined;
// }

const prisma = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}

export default prisma;