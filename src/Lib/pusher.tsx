import Pusher from "pusher-js"

const pusher = new Pusher(process.env.PUSHER_KEY as string,{
    cluster: process.env.PUSHER_CLUSTER as string

})

export default pusher