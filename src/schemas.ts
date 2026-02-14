import { z } from "zod";

/** Categories */
export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

export const CategoriesResponseSchema = z.array(CategorySchema)

export const CategoryFormSchema = z.object({
    name: z.string().trim().min(1, {message: 'El Nombre de la Categoría es requerido.'}),
})

/** Products */
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.number(),
    category: CategorySchema.optional()
})

export const ProductsResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number()
})

export const ProductFormSchema = z.object({
    name: z.string().trim().min(1, {message: 'El Nombre del Producto es requerido.'}),
    price: z.coerce.number({message: 'Precio Inválido.'}).min(1, {message: 'El Precio debe ser mayor a 0.'}),
    image: z.string({message: "La imagen es requerida."}),
    inventory: z.coerce.number({message: 'Inventario Inválido.'}).min(1, {message: 'El inventario debe ser mayor a 0.'}),
    categoryId: z.coerce.number({message: 'Categoria Inválida.'}).min(1, {message: 'La categoria es requerida.'})
})

/** Categories with products */
export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});

/** Shopping Cart */
const ShoppingCartContentsSchema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true,
}).extend({
    productId: z.number(),
    quantity: z.number()
})

export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema)

export const CouponResSchema = z.object({
    name: z.string().default(''),
    message: z.string(),
    percentage: z.coerce.number().min(0).max(100).default(0)
})

/** Coupons Admin */
export const CouponAdminSchema = z.object({
    id: z.number(),
    name: z.string(),
    percentage: z.number(),
    expirationDate: z.string(),
    isActive: z.boolean()
})

export const CouponsAdminResponseSchema = z.array(CouponAdminSchema)

export const CouponFormSchema = z.object({
    name: z.string().trim().min(1, {message: 'El Nombre del Cupón es requerido.'}).max(30, {message: 'El nombre no puede exceder 30 caracteres.'}),
    percentage: z.coerce.number({message: 'Descuento Inválido.'}).int({message: 'El descuento debe ser un número entero.'}).min(1, {message: 'El descuento mínimo es 1.'}).max(100, {message: 'El descuento máximo es 100.'}),
    expirationDate: z.string().min(1, {message: 'La fecha de expiración es requerida.'})
})

/** Orders */
const OrderContentSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
    price: z.number()
})

export const OrderSchema = z.object({
    total: z.number(),
    coupon: z.string(),
    contents: z.array(OrderContentSchema).min(1, {message: 'El Carrito no puede ir vacio.'})
})

/** Success / Error Response */
export const SuccessResponseSchema = z.object({
    message: z.string()
})
export const ErrorResponseSchema = z.object({
    message: z.union([z.string(), z.array(z.string())]).transform((value) =>
        Array.isArray(value) ? value : [value]
    ),
    error: z.string().optional(),
    statusCode: z.number()
})

/** Transactions */
export const ContentsSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    price: z.coerce.number(),
    product: ProductSchema
})

export const OneTransactionResponseSchema = z.object({
    id: z.number(),
    total: z.coerce.number(),
    transactionDate: z.string(),
    discount: z.coerce.number().nullable(),
    coupon: z.string().nullable(),
    contents: z.array(ContentsSchema)
})
  
export const TransactionsResponseSchema = z.array(OneTransactionResponseSchema)

/** Types */
export type Product = z.infer<typeof ProductSchema>
export type Category = z.infer<typeof CategorySchema>
export type Coupon = z.infer<typeof CouponResSchema>
export type CouponAdmin = z.infer<typeof CouponAdminSchema>
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>
export type Transaction = z.infer<typeof OneTransactionResponseSchema>

/** Analytics */
export const DailySaleSchema = z.object({
    date: z.string(),
    total: z.coerce.number(),
    transactions: z.number()
})

export const TopProductSchema = z.object({
    productId: z.number(),
    name: z.string(),
    image: z.string(),
    quantity: z.number(),
    revenue: z.coerce.number()
})

export const CouponUsageSchema = z.object({
    name: z.string(),
    usageCount: z.number(),
    totalDiscount: z.coerce.number()
})

export const AnalyticsSummarySchema = z.object({
    totalRevenue: z.coerce.number(),
    totalTransactions: z.number(),
    totalProductsSold: z.number(),
    averageTicket: z.coerce.number(),
    totalDiscount: z.coerce.number(),
    bestDay: z.object({
        date: z.string(),
        total: z.coerce.number(),
        transactions: z.number()
    })
})

export const AnalyticsResponseSchema = z.object({
    dailySales: z.array(DailySaleSchema),
    topProducts: z.array(TopProductSchema),
    couponUsage: z.array(CouponUsageSchema),
    summary: AnalyticsSummarySchema
})

export type Analytics = z.infer<typeof AnalyticsResponseSchema>
export type DailySale = z.infer<typeof DailySaleSchema>
export type TopProduct = z.infer<typeof TopProductSchema>
export type CouponUsage = z.infer<typeof CouponUsageSchema>
export type AnalyticsSummary = z.infer<typeof AnalyticsSummarySchema>