import { EthDateTime } from 'ethiopian-calendar-date-converter';

const MONTHS = [
  "Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yakatit",
  "Maggabit", "Miyazya", "Ginbot", "Sene", "Hamle", "Nehase", "Pagume"
];

export function convertToEthiopianString(date: Date): string {
    if (!date || isNaN(date.getTime())) return "";
    
    try {
        const ethDate = EthDateTime.fromEuropeanDate(date);
        return `${MONTHS[ethDate.month - 1]} ${ethDate.date}, ${ethDate.year}`;
    } catch(e) {
        return date.toLocaleDateString();
    }
}
