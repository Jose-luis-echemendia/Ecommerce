import { useState } from "react"

export const useForm = (initialForm={}) => {
    const [formState, setFormState] = useState(initialForm)
    
    const onInputChange = (event) =>{
        const {name, value} = event.target
        setFormState({
            ...formState,
            [name]:value
        })
    }

     

  return {
    formState,
    onInputChange,
    setFormState
  }
}
