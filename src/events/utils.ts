import type { EventEntry } from './entities';
import ado from 'src/assets/audio.json';

export function generateEventPool(events: EventEntry[]): EventEntry[] {
  let counter = 0;
  return events.map((event, index) => ({
    ...event,
    dt: Date.parse(event.date),
    json: event.event.toLowerCase(),
    id: String(counter++),
    audio: 'title/' + event.event + '_rec_' + ado[index] + '.mp3',
    audiom: 'all/' + (index + 1) + '.mp3',
    image: '',
  }));
}
