const { prisma } = require('../../lib/db.js');
export async function GET() {
    const data = await prisma.INFO.findMany();
    return new Response(JSON.stringify(data));
}