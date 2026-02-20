import OrderCard from './OrderCard'

export default function OrderList({ orders }: { orders: any[] }) {
  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}