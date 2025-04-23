import { useEffect, useState } from "react"

export default function HalfPrice({ 
    free, paid,
    changeHalfTitle,
    changeHalfNetAmountToOrganizer,
    changeHalfAmountToClient,
    changeQuantityHalfTicket }) {

    const [MeiaEntradaCheck, setCheck] = useState(false)
    const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(false)


    const EnableCheck = () => {


        if (paid) {
            setCheck(!MeiaEntradaCheck)
        }

    }

    useEffect(() => {
        setIsCheckboxDisabled(!paid)
        if (!paid) setCheck(false)
    }, [paid])


    return (

        <>

            <div className="flex justify-start w-full mt-5">
                <div className="flex items-start space-x-2">
                    <input type="checkbox" id="MeiaEntrada" checked={MeiaEntradaCheck} disabled={isCheckboxDisabled} onChange={EnableCheck} className="mt-1" />
                    <div className="flex flex-col">
                        <label className="text-sm" htmlFor="MeiaEntrada">Criar meia-entrada para este ingresso</label>
                        {MeiaEntradaCheck && !free && <span className="text-xs text-roxo-principal-600 mt-2">Saiba mais sobre as políticas de meia-entrada</span>}
                    </div>
                </div>
            </div>

            {MeiaEntradaCheck && !free && <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Nome da meia-entrada</label>
                        <input className="border border-gray-400 rounded-sm p-3 w-full" type="text" placeholder="Ingresso único, VIP, etc..." onChange={(e) => changeHalfTitle(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Quantidade</label>
                        <input className="border border-gray-400 rounded-sm p-3 w-full" type="text" placeholder="Ex: 100"  onChange={(e) => changeQuantityHalfTicket(e.target.value)}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Valor a receber</label>
                        <input className="border border-gray-400 rounded-sm p-3 w-full" type="text" placeholder="R$" onChange={(e) => changeHalfNetAmountToOrganizer(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Valor do comprador</label>
                        <input className="border border-gray-400 rounded-sm p-3 w-full" type="text" placeholder="R$" onChange={(e) => changeHalfAmountToClient(e.target.value)}/>
                    </div>
                </div>
            </>}
        </>

    )

}