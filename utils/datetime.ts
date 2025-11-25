

function formatJsDateToHHmmMMdd(date: Date): string {
    const militaryHours = date.getHours() % 12
    const hours = (militaryHours % 12) || 12;
    const ampm = hours >= 12 ? 'pm' : 'am';
    const hourString = String(date.getHours()).padStart(2, '0');
    const minuteString = String(date.getMinutes()).padStart(2, '0');
    const monthString = String(date.getMonth() + 1); // Month is 0-indexed
    const dayString = String(date.getDate()).padStart(2, '0');

    return `${hourString}:${minuteString}${ampm} ${monthString}/${dayString}`;
}

export {
    formatJsDateToHHmmMMdd
};
