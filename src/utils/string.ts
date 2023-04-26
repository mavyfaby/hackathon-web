const intl = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
});

/**
 * Convert number to currency format
 */
export function toCurrency(amount: number) {
    return intl.format(amount);
}

/**
 * Convert 24-hour time to 12-hour time
 */
export function to12HourTime(time: string) {
    const [hour, minute] = time.split(':');
    const suffix = Number(hour) >= 12 ? 'PM' : 'AM';
    const hour12 = Number(hour) % 12 || 12;
    return `${hour12}:${minute} ${suffix}`;
}