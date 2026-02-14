import { formatPrice } from '@/utils';

interface Props {
    label: string
    amount: number
    discount?: boolean
}

export function Amount({ label, amount, discount = false }: Props) {
    return (
        <div className={`${discount && "bg-apple-300"} p-2 flex justify-between text-cielo-800`}>
            <dt className='font-bold'>
                {label}
            </dt>
            <dd className='font-black'>
                {discount ? '- ' : '= '} {formatPrice(amount)}
            </dd>
        </div>
    )
}
