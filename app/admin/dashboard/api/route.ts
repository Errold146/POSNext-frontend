export const dynamic = 'force-dynamic'

export async function GET() {
    const url = `${process.env.API_URL}/transactions/analytics`
    const req = await fetch(url)
    const response = await req.json()
    return Response.json(response)
}
