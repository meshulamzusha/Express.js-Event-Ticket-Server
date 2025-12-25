import { getFileContent } from "../utils/fileUtils.js";

export async function SummarizePurchases(username) {
    try {
        const receipts = JSON.parse(await getFileContent('./data/receipts.json'))

        if (receipts.length == 0) {
            return 0
        }
        
        const usersReceipts = receipts.filter((r => r.username == username)) 
        const sumTickets = usersReceipts.reduce(
            (acc, currentReceipt) => acc + currentReceipt.ticketsBought, 0)
        const events = usersReceipts.map(s => s = s.eventName)
        const uniqueEvents = new Set(events)

        const summary = {
            totalTicketsBought: sumTickets,
            events: [...uniqueEvents],
            averageTicketsPerEvent: sumTickets / [...uniqueEvents].length
        }

        return summary

    } catch (error) {
        throw error
    }
}