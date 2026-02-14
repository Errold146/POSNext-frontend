export const dynamic = 'force-dynamic'

export async function GET() {
    const url = `${process.env.API_URL}/coupons`
    const req = await fetch(url)
    const response = await req.json()
    return Response.json(response)
}
