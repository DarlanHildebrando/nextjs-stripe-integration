'use client'

import { useEffect, useState } from "react";
import CreateTickets from "./components/formTickets/CreateTickets";

export default function Home() {

  const [FormActive, setActive] = useState(false)

  useEffect(() => {

    if(close === true){

      setActive(false)

    }

  }, [CreateTickets])


  return (
    <div className="flex justify-center items-center text-center h-screen">

      <button onClick={() => setActive(true)} className="bg-roxo-principal-600 text-white p-3 rounded-sm">Crie seu ingresso</button>
      

     {FormActive && <CreateTickets close={() => setActive(false)}/>}

    </div>
  );
}
