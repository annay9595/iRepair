import { api } from "../services/api";
import { useEffect, useState } from "react";
import  type { OS } from "../tipos/OS";
import { ServiceCard } from "../componentes/ServiceCard";
import type { Client } from "../tipos/Client";


export const DashboardPage = () => {

  const [serviceOrders, setServiceOrders] = useState<OS[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  async function fetchServiceOrders() {
    try {
      const ordersResponse = await api.get("/service-orders")
      const clientsResponse = await api.get("/clients")
      setServiceOrders(ordersResponse.data.data)
      setClients(clientsResponse.data.data)
    } catch (error) {
      console.error("Erro ao buscar OS", error)
    } finally {
      setLoading(false)
    }
  }

  fetchServiceOrders()
}, [])
  if(loading){
    return <p>Carregando Ordens de Serviço</p>
  }
  if (!serviceOrders.length) {
  return <p>Nenhuma ordem de serviço encontrada.</p>
}
  return(
  <div className="grid gap-4">
    {serviceOrders.map((order) => {
      const client= clients.find(c=> c.id === order.client_id)
      return(
    <ServiceCard
      key={order.id}
      id={order.id}
      client_id={order.client_id}
      device={order.device}
      issue={order.issue}
      status={order.status}
      clientName={client?.name ?? "Cliente desconhecido"}
      created_at={order.created_at}
    />
      )
      })}
  </div>

  ); 
  
};