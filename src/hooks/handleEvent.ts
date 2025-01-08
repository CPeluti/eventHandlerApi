import axios from "axios"
import type { Event } from "../services/event/event.class"
import { BadRequest } from "@feathersjs/errors"
import { HookContext } from "../declarations"
export const handleEvent = async (context: HookContext,event: Event) =>{
    switch(event.payload.type){
        case "proxy":
            axios.post(event.target, event)
            break
        case "database":
            for(const register of event.payload.content){
                if(typeof register !== "string"){
                    try{
                        const property = await context.app.service('property')._find({query: {entityId: register.document, name: register.property}})
                        if(property.data[0]){
                            context.app.service('property')._patch(property.data[0]._id.toString(), {status: register.newValue})
                        }
                    } catch (e: any) {
                        throw new Error(e)
                    }
                }
            }
        default: 
            throw new BadRequest("Invalid payload type")
    }
}