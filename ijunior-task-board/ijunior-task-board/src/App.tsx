import './App.css'
import { Header } from "./componentes/Header";
import { ServiceCard } from './componentes/ServiceCard';
import { NewServiceForm } from './componentes/NewServiceForm';
import { useState } from 'react';
import type { OS } from "./tipos/OS"


function App() {

  const [services, setServices] = useState<OS[]>([])
  function addService(service: OS) {
    setServices([...services, service])
  }

  function toggleStatus(index: number) {
  const updatedServices = services.map((service, i) => {
    if (i === index) {
      return { ...service, status: !service.status }
    }
    return service
  })

  setServices(updatedServices)
}

  return (
    <div className='bg-gray-900 flex flex-col justify-center min-h-screen '>
      <Header />

      <NewServiceForm addService={addService} />
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          nome_cliente={service.nome_cliente}
          aparelho={service.aparelho}
          defeito={service.defeito}
          status={service.status}
          toggleStatus={() => toggleStatus(index)}
        />
      ))}
    </div>
  )
}

export default App
