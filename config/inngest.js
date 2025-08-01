import { Inngest } from "inngest";
import { connect } from "mongoose";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//Inngest Function to save  user data save to Datbase
export const syncUserCreation =inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {event:'clerk/user.created'},
    async ({event}) =>{
          const { id,first_name,last_name,email_addresses,image_url }=event.data
          const userData={
            _id:id,
            eamil:email_addresses[0].email_address,
            name:first_name + '' + last_name,
            imageUrl:image_url
          }
          await connectDB()
          await User.create(userData)
    }
)

//inngest Function to update user data in database

export const syncUserUpdation = inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    {event :'clerk/user.updated'},
    async({event})=>{
        const { id,first_name,last_name,email_addresses,image_url} = event.data
        const userData ={
             _id:id,
             email:email_addresses[0].email.address,
             name:first_name + '' +last_name,
             imageUrl:image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)
    }
)

//inngest Functon delete to database
export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete-user-from-clerk'
    },
    {event:'clerk/user.deleted '},
    async({event})=>{
        const { id,first_name,last_name,email_addresses,image_url} = event.data
        const userData ={
             _id:id,
             email:email_addresses[0].email.address,
             name:first_name + '' +last_name,
             imageUrl:image_url
        }
        await connectDB()
        await User.findByAndDelete(id)
    }
)