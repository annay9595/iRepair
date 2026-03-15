import type { OS } from "../tipos/OS"
interface ServiceCardProps extends OS {
    clientName: string
}

export function ServiceCard({ clientName, device, issue, status }: ServiceCardProps) {
  return (
    <div className="bg-gray-500 p-6 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-2">{device}</h2>

      <div
        className={`border p-4 rounded-md transition-all ${
          status === "finished"
            ? "bg-gray-200 text-black"
            : "bg-green-500 text-green-950"
        }`}
      >
        <p><strong>Cliente:</strong> {clientName}</p>
        <p><strong>Defeito:</strong> {issue}</p>

        <p className="mt-2 font-semibold flex justify-end">
          Status: {status === "finished" ? "Finalizado" : "Aberto"}
        </p>
      </div>
    </div>
  )
}