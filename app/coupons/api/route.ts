export async function POST(req: Request) {
    const coupon = await req.json()
    const url = `${process.env.API_URL}/coupons/apply-coupon`
   
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(coupon)
    })
    
    const res = await request.json()
    return Response.json({ ...res }, { status: request.status })
}