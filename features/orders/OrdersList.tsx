import OrderCard from './OrderCard'

export default function OrderList({ orders }: { orders: any[] }) {
  return (
    <div className="grid gap-6 sm:gap-4 w-full max-w-full overflow-hidden">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}