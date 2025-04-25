'use client'

import { useEffect, useState } from "react"
import CreateButton from "./CreateButton"
import PaidOrFree from "./PaidOrFree"
import HalfPrice from "./HalfPrice"

export default function CreateTickets({ close }) {


    const [startDate, setStartDate] = useState(false)
    const [startTime, setStartTime] = useState(false)
    const [endDate, setEndDate] = useState('')
    const [endTime, setEndTime] = useState('')
    const [Ticket, setTicket] = useState({

        paidOrFree: '',
        title: "",
        quantity: 0,
        organizerNetAmount: 0,
        clientAmount: 0,
        halfTitle: "",
        quantityHalfTicket: 0,
        halfNetAmountToOrganizer: 0,
        halfAmountToClient: 0,
        startDate: new Date(),
        endDate: new Date(),
        description: ''
    })

    const DateAndTimeS = (date, time) => {

        if(!date || !time) return;

        const newDate = new Date(`${date}T${time}`)
        setTicket(prev => ({...prev, endDate: newDate}))

        console.log(Ticket.endDatetDate.toISOString())

    }

    const DateAndTimeE = (date, time) => {

        if(!date || !time) return;

        const newDate = new Date(`${date}T${time}`)
        setTicket(prev => ({...prev, startDate: newDate}))

        console.log(Ticket.endDate.toISOString())

    }



    return (

        <div className="fixed inset-0 bg-black/50 z-50 ">

            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col shadow-[0px_4px_10px_rgba(0,0,0,0.2)] w-full max-w-[600px] h-full max-h-[87vh] p-6 bg-white rounded-lg overflow-y-auto">
                    <div className="flex items-center justify-between w-full">
                        <img onClick={close} src="/icons/XRoxo.svg" alt="Fechar" className="h-[20px]" />

                        <div className="flex items-center space-x-2 mx-auto">
                            <h1 className="text-xl">
                                Criar ingresso <span className="text-roxo-principal-600 font-bold">{Ticket.paidOrFree}</span>
                            </h1>
                            <img src="/icons/IngressoRoxo.svg" alt="Ingresso" className="h-[20px]" />
                        </div>

                        <div className="h-[20px] w-[20px] opacity-0" />
                    </div>


                    <div className="py-2 px-2 mt-3 text-center text-[11px] border-2 border-gray-300 w-full bg-cinza-principal-100 rounded-[3px]">
                        <p className="text-gray-700">A <span className="font-semibold">taxa de serviço é repassada ao comprador</span>, sendo exibida junto com o valor do ingresso</p>
                    </div>

                    <PaidOrFree id={Ticket.paidOrFree} onChange={(value) => setTicket({ paidOrFree: value })} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-5">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Título do ingresso</label>
                            <input className="border border-gray-400 rounded-sm p-3 w-full" type="text" placeholder="Ingresso único, VIP, etc..." onChange={(e) => setTicket({...Ticket, title: e.target.value })} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Quantidade</label>
                            <input className="border border-gray-400 rounded-sm p-3 w-full" type="text" placeholder="Ex: 100" onChange={(e) => setTicket({...Ticket, quantity: e.target.value })} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-5">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Valor a receber</label>
                            <input className="border border-gray-400 rounded-sm p-3 w-full" type="text" placeholder="R$" onChange={(e) => setTicket({...Ticket, organizerNetAmount: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Valor do comprador</label>
                            <input className="border border-gray-400 rounded-sm p-3 w-full" type="text" placeholder="R$" onChange={(e) => setTicket({ ...Ticket, clientAmount: e.target.value })} />
                        </div>
                    </div>

                    <HalfPrice 
                    free={Ticket.paidOrFree === 'gratuito'} 
                    paid={Ticket.paidOrFree === 'pago'} 

                    changeHalfTitle={(value) => setTicket(prev =>({...prev, halfTitle: value}))}

                    changeHalfNetAmountToOrganizer={(value) => setTicket(prev => ({...prev, halfNetAmountToOrganizer: value}))}

                    changeHalfAmountToClient={(value) => setTicket(prev => ({...prev, halfAmountToClient: value}))}

                    changeQuantityHalfTicket={(value) => setTicket(prev => ({...prev, quantityHalfTicket: value}))}
                    />

                    <div className="flex justify-start w-full mt-5">
                        <div className="flex flex-col">
                            <legend className="text-roxo-principal-600 font-semibold">Período de vendas</legend>
                            <div className="flex flex-col sm:flex-row sm:space-x-5 mt-4 space-y -2 sm:space-y-0">
                                <div className="flex items-center space-x-1">
                                    <input className="" type="radio" name="meia-entrada" />
                                    <label>Por data</label>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <input type="radio" name="meia-entrada" />
                                    <label>Por lote</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-5">
                        <div className="flex gap-3">
                            <div className="flex flex-col w-2/3">
                                <label htmlFor="">Data de início</label>
                                <input className="border border-gray-400 rounded-sm p-3 w-full text-sm" type="date" onChange={(e) => {const value = e.target.value; setStartDate(value); DateAndTimeS(value, startTime)}}/>
                            </div>
                            <div className="flex flex-col w-1/3">
                                <label htmlFor="">Horário</label>
                                <input className="border border-gray-400 rounded-sm p-3 w-full text-sm" type="time" onChange={(e) => {const value = e.target.value; setStartTime(value); DateAndTimeS(startDate, value)}}/>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex flex-col w-2/3">
                                <label htmlFor="">Data de término</label>
                                <input className="border border-gray-400 rounded-sm p-3 w-full text-sm" type="date"  onChange={(e) => {const value = e.target.value; setEndDate(value); DateAndTimeE(value, endTime)}}/>
                            </div>
                            <div className="flex flex-col w-1/3">
                                <label htmlFor="">Horário</label>
                                <input className="border border-gray-400 rounded-sm p-3 w-full text-sm" type="time" onChange={(e) => {const value = e.target.value; setEndTime(value); DateAndTimeE(endDate, value)}}/>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-start w-full mt-5">
                        <div className="flex flex-col w-full">
                            <label htmlFor="">Adicione uma descrição ao seu ingresso (opcional)</label>
                            <textarea className="border mt-2 border-gray-400 rounded-sm p-3 resize-none w-full" rows="4" placeholder="Insira a descrição do seu ingresso (opcional)" onChange={(e) => setTicket(prev => ({...prev, description: e.target.value})) }/>
                        </div>
                    </div>

                    <CreateButton ticket={Ticket} />

                </div>
            </div>

        </div>

    )
}