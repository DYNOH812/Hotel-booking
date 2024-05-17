import { getRoom } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


type RequestData = {
    checkinDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
    numberOfDays: number;
    hotelRoomSlug:string;
}

export async function POST(req: Request, res:Response){
    const {
        checkinDate,
        checkOutDate,
        adults,
        children,
        numberOfDays,
        hotelRoomSlug
    }: RequestData = await req.json();

   if(!checkinDate ||!checkOutDate ||!adults ||!numberOfDays||!hotelRoomSlug){
        return new NextResponse("all fields must be filled",{status:400})
    }

    const origin = req.headers.get('origin');

    const session = await getServerSession(authOptions);

    if(!session ){
        return new NextResponse("Authentication required",{status:400})
    }

    const userId = session.user.id;
    const formattedCheckoutDate = checkOutDate.split('T')[0];
    const formattedCheckinDate = checkinDate.split('T')[0];

    try {
        const room= await getRoom(hotelRoomSlug);
        const discountPrice = room.price - (room.price/100)*room.discount;
        const totalPrice = discountPrice * numberOfDays;

        //create a stripe payment
        const stripeSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [{
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: room.name,
                        images: room.images.map((image: { url: any; }) => image.url),
                    },
                    unit_amount: parseInt((totalPrice * 100).toString()),
                }
            }],
            payment_method_types: ['card'], // Use ":" instead of "=" for assignment
            success_url: `${origin}/users/${userId}`, // Use ":" instead of "=" for assignment
            metadata: {
                adults,
                checkinDate: formattedCheckinDate,
                checkOutDate: formattedCheckoutDate,
                children,
                hotelRoom: room._id,
                numberOfDays,
                user: userId,
                discount: room.discount,
                totalPrice,

            }
        });
        
       return NextResponse.json(stripeSession,{status:200, statusText:"payment session created"})

    } catch (error:any) {
        console.log("payment failed", error);
        return new NextResponse(error, {status:500})
    }
}