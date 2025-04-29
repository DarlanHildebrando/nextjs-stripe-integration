-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "client_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "client_password" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "event_name" TEXT NOT NULL,
    "description" TEXT,
    "client_id" INTEGER NOT NULL,
    "photo" BYTEA,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "organizer_net_amount" INTEGER NOT NULL,
    "price_for_client" INTEGER NOT NULL,
    "paid_or_free" BOOLEAN NOT NULL,
    "half_title" TEXT,
    "quantity_half_ticket" INTEGER,
    "half_net_amount_to_organizer" INTEGER,
    "half_price_to_client" INTEGER,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "events_id" INTEGER NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket_purchase" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "tickets_id" INTEGER NOT NULL,
    "stripe_checkout_session_id" TEXT NOT NULL,
    "status_pagamento" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_events_id_fkey" FOREIGN KEY ("events_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_purchase" ADD CONSTRAINT "Ticket_purchase_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_purchase" ADD CONSTRAINT "Ticket_purchase_tickets_id_fkey" FOREIGN KEY ("tickets_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
