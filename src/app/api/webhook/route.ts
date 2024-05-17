import { createBooking, updateHotelRoom } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST (req: Request, res: Response) {
    const reqBody = await req.text();
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event: Stripe.Event;

    try {
        if(!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
    } catch (error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, {status:500})
    }

    

    // load events
    switch (event.type){
        case checkout_session_completed:
            const session = event.data.object;
            
            const {
                metadata:{
                    adults,
                    checkinDate,
                    checkOutDate,
                    children,
                    hotelRoom,
                    numberOfDays,
                    user,
                    discount,
                    totalPrice,
                },
            } = session;

        
       await createBooking({
        adults: Number(adults), 
        checkinDate,
        checkOutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
         })

         // update hotel room
         await updateHotelRoom(hotelRoom);


        return Response.json("Booking successful", {status: 200, statusText: 'Booking successful'});

        default:
            console.log(`unhandled event type ${event.type}`);
    }
    return Response.json("Event Received", {status: 200, statusText: 'Event Received'});
}