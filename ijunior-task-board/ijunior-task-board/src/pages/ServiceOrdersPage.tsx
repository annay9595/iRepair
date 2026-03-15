import { useState, useEffect } from "react"
import { api } from "../services/api"
import type { OS, CreateOsData } from "../tipos/OS"
import type { Client } from "../tipos/Client"

export const ServiceOrdersPage = () => {

  const [orders, setOrders] = useState<OS[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  const [clientId, setClientId] = useState<number>()
  const [device, setDevice] = useState("")
  const [issue, setIssue] = useState("")

  useEffect(() => {

    async function fetchData() {
      try {

        const ordersResponse = await api.get("/service-orders")
        const clientsResponse = await api.get("/clients")

        setOrders(ordersResponse.data.data)
        setClients(clientsResponse.data.data)

      } catch (error) {
        console.error("Erro ao carregar dados", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

  }, [])

  async function handleCreateOrder(e: React.FormEvent) {
    e.preventDefault()

    const data: CreateOsData = {
      clientId: clientId!,
      device,
      issue
    }

    try {

      const response = await api.post("/service-orders", data)

      setOrders(prev => [...prev, response.data.data])

      setDevice("")
      setIssue("")
      setClientId(undefined)

    } catch (error: any) {
  console.log("Erro da API:", error.response?.data)
  console.error("Erro ao criar OS", error)
}
  }
  async function handleDeleteOrder(id: number) {
    try {

      await api.delete(`/service-orders/${id}`)

      setOrders(prev => prev.filter(o => o.id !== id))

    } catch (error) {
      console.error("Erro ao deletar OS", error)
    }
  }
  if (loading){
    return <p>Carregando ordens de serviço...</p>
  }

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">Ordens de Serviço</h2>

      <form onSubmit={handleCreateOrder} className="flex gap-2">

        <select
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
          className="border p-2 rounded"
        >
          <option className="text-black" value="">Selecione um cliente</option>

          {clients.map(client => (
            <option className=" text-black" key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}

        </select>

        <input
          placeholder="Dispositivo"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Problema"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded"
        >
          Criar OS
        </button>

      </form>
      <div className="space-y-2">
        {orders.length === 0 && (
          <p>Nenhuma ordem de serviço encontrada.</p>
        )}

        {orders.map(order => {

          const client = clients.find(c => c.id === order.client_id)

          return (
            <div
              key={order.id}
              className="border p-3 rounded flex justify-between"
            >

              <div>
                <p className="font-bold">{client?.name}</p>
                <p>{order.device}</p>
                <p className="text-sm">{order.issue}</p>
                <p className="text-xs text-gray-500">{order.status}</p>
              </div>

              <button
                onClick={() => handleDeleteOrder(order.id)}
                className="bg-red-500 text-white px-3 rounded"
              >
                Remover
              </button>

            </div>
          )

        })}

      </div>

    </div>
  )
}