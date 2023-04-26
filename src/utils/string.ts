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