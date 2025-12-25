import { getEvents } from "../utils/eventUtils.js";
import { getFileContent, saveDataToFile } from "../utils/fileUtils.js";

export async function buyTickets(body) {
    try {
        const { username, eventName, quantity } = body;
        const events = await getEvents()
        const index = events.findIndex(e => e.eventName.toLowerCase() == eventName.toLowerCase())

        if (index != -1) {
            const isEnoughTickets = events[index].ticketsForSale >= quantity

            if (isEnoughTickets) {
                const receipt = {
                    username: username,
                    eventName: eventName,
                    ticketsBought: quantity
                }

                const receipts = JSON.parse(await getFileContent('./data/receipts.json'));

                receipts.push(receipt)
                await saveDataToFile('./data/receipts.json', JSON.stringify(receipts, null, 2))

                events[index].ticketsForSale -= quantity;
                console.log(events[index].ticketsForSale -= quantity);
                
                await saveDataToFile('./data/events.json', JSON.stringify(events, null, 2))

                return {
                    status: 200,
                    receipt: receipt
                }
            } else {
                return {
                    status: 422
                }
            }
        }

        return {
            status: 404
        }

    } catch (error) {
        throw error;
    }
}