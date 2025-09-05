import type { EventEntry } from './entities';

export function generateEventPool(events: EventEntry[]): EventEntry[] {
  let counter = 0;
  return events.map((event) => ({
    ...event,
    dt: Date.parse(event.date),
    json: event.event.toLowerCase(),
    id: String(counter++),
  }));
}
