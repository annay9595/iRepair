import { useState } from "react";
import type { OS } from "../tipos/OS"
interface NewServiceFormProps {
  addService: (service: OS) => void
}


export function NewServiceForm({ addService }: NewServiceFormProps) {

  function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  const novoServico: OS = {
    nome_cliente: nomeCliente,
    aparelho: aparelho,
    defeito: defeito,
    status: false
  }

  addService(novoServico)

  setNomeCliente("")
  setAparelho("")
  setDefeito("")
}
  const [nomeCliente, setNomeCliente] = useState("")
  const [aparelho, setAparelho] = useState("")
  const [defeito, setDefeito] = useState("")
  return (
   <form className="bg-gray-300 p-2 flex flex-col gap-3 rounded-md" onSubmit={handleSubmit}>
    <p>Nome do Cliente: <input type="text" required className="bg-white" value={nomeCliente} onChange={(e)=>setNomeCliente(e.target.value)} /></p>
    <p>Aparelho: <input type="text" required className="bg-white" value={aparelho} onChange={(e)=>setAparelho(e.target.value)}/></p>
    <p>Defeito: <input type="text" required className="bg-white" value={defeito} onChange={(e)=>setDefeito(e.target.value)}/></p>
    <button type="submit">Salvar</button>
   </form>
  );
}