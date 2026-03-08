import type { OS } from "../tipos/OS"
interface ServiceCardProps extends OS {
  toggleStatus: () => void
}

export function ServiceCard({ nome_cliente, aparelho, defeito, status, toggleStatus }: ServiceCardProps) {
  return (
    <div className="bg-gray-500 p-6 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-2">{aparelho}</h2>
      <input type="checkbox" checked={status} onChange={toggleStatus}/>
      <div
        className={`border p-4 rounded-md transition-all ${
          status ? "bg-gray-200 line-through text-black" : "bg-green-500 text-green-950"}`
          }>
        <p><strong>Cliente:</strong> {nome_cliente}</p>
        <p><strong>Defeito:</strong> {defeito}</p>
        <p className="mt-2 font-semibold flex justify-end" >
          Status: {status ? "Finalizado" : "Aberto"}
        </p>
      </div>
    </div>
  );
}