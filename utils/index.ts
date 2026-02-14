export function formatPrice(amount: number) {
    return new Intl.NumberFormat(
        'es-US', { style: 'currency', currency: 'USD'}
    ).format(amount)
}

export function getImagePath(image: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if ( image.startsWith(cloudinaryBaseUrl) ) {
        return image
    }
    const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
    return `${apiUrl}/img/${image}`
}

export const isAvialable = (inventory: number) => inventory > 0