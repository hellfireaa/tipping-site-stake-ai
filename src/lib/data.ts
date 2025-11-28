import fs from 'fs/promises';
import path from 'path';
import { Event } from './mock-data';

const DATA_FILE = path.join(process.cwd(), 'src/db/events.json');

export async function getEvents(): Promise<Event[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading events data:", error);
        return [];
    }
}

export async function getEventById(id: string): Promise<Event | undefined> {
    const events = await getEvents();
    return events.find(e => e.id === id);
}
