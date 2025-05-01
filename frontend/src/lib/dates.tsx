
export function parseDate(date: string) {
    return new Date(date).toLocaleDateString();
}

export function equalDates(date1: string, date2: string) {
    return parseDate(date1) === parseDate(date2);
}