import { createContext, useState } from "react";
import { X } from "react-feather";
import { Alert } from "../components/Alert";
import { CheckCircle } from "react-feather"; 

//creando contexto
export const AlertContext = createContext();

function useAlertContext() {
  const [ alerts, setAlerts ] = useState([])

  const createdAlert = (msg, alertType, alertIcon=null ,timeout=5000) => {
    
    const Icon = alertIcon || CheckCircle 
    

    const id = Date.now()
    setAlerts(alerts => [...alerts, {id, msg, alertType, Icon}])

    setTimeout(()=> deletedAlert(id), timeout)

  }

  const deletedAlert = (id) => {
    setAlerts(alerts => alerts.filter(alert => alert.id !== id))
  }
  
  return {
    alerts,
    createdAlert,
    deletedAlert

    
  };
}

//proveer contexto
export function AlertProvider({ children }) {
  const { alerts, createdAlert, deletedAlert } = useAlertContext();

  return (
    <AlertContext.Provider value={{ alerts, createdAlert, deletedAlert }}>
      {children}
      <div className="fixed space-y-2 bottom-4 right-4 z-50">
        {alerts.map((alert) => (
          <div className="relative" key={alert.id}>
            <button
              className="absolute top-2 right-2 p-1 rounded-lg bg-gray-200/20 text-gray-800/60"
              onClick={() => deletedAlert(alert.id)}
            >
              <X size={16}></X>
            </button>
            <Alert alert={alert}></Alert>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
}
