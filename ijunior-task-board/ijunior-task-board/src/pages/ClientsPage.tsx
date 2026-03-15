import { useState, useEffect } from "react"
import type { Client, CreateClientData } from "../tipos/Client"
import { api } from "../services/api"

export const ClientsPage = () => {

  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await api.get("/clients")
        setClients(response.data.data)
      } catch (error) {
        console.error("Erro ao buscar clientes", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  async function handleCreateClient(e: React.FormEvent) {
    e.preventDefault()

    const data: CreateClientData = {
      name,
      phone,
      email
    }

    try {
      const response = await api.post("/clients", data)
      console.log(response)
      console.log(response.data) 
      setClients(prev => [...prev, response.data.data])
      

      setName("")
      setPhone("")
      setEmail("")
    } catch (error) {
      console.error("Erro ao criar cliente", error)
    }
  }

  async function handleDeleteClient(id: number) {
    try {
      await api.delete(`/clients/${id}`)

      setClients(prev => prev.filter(c => c.id !== id))
    } catch (error) {
      console.error("Erro ao deletar cliente", error)
    }
  }

  if (loading) {
    return <p>Carregando clientes...</p>
  }

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">Clientes</h2>

      <form onSubmit={handleCreateClient} className="flex gap-2">

        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded"
        >
          Criar
        </button>

      </form>

      <div className="space-y-2">
        {clients.map(client => (
          <div
            key={client.id}
            className="border p-3 rounded flex justify-between"
          >
            <div>
              <p className="font-bold">{client.name}</p>
              <p>{client.phone}</p>
              <p className="text-sm text-gray-500">{client.email}</p>
            </div>

            <button
              onClick={() => handleDeleteClient(client.id)}
              className="bg-red-500 text-white px-3 rounded"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}