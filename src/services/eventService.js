import { getEvents } from "../utils/eventUtils.js"
import { saveDataToFile } from "../utils/fileUtils.js";

export async function addEvent(body) {
    try {
        const { eventName, ticketsForSale, username } = body
        const events = await getEvents();
        const event = {
            eventName: eventName,
            ticketsForSale: ticketsForSale,
            createdBy: username,
        }

        events.push(event)
        await saveDataToFile('./data/events.json',  JSON.stringify(events, null, 2))

        return event

    } catch (error) {
        throw error
    }
}