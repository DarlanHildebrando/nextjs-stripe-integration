import { useState } from "react"

export default function PaidOrFree({id, onChange}) {

    return (

        <div className="flex justify-center space-x-5 w-full mt-5 font-xs">

            <div className="flex space-x-1">
                <input type="radio" name="PaidOrFree" id="pago" onChange={(e) => onChange(e.target.id) }/>
                <legend>Ingresso <span className="text-roxo-principal-600 font-bold">pago</span></legend>
            </div>

            <div className="flex space-x-1">
                <input type="radio" name="PaidOrFree" id="gratuito" onChange={(e) => onChange(e.target.id) }/>
                <legend>Ingresso <span className="text-roxo-principal-600 font-bold">gratuito</span></legend>
            </div>

        </div>

    )

}