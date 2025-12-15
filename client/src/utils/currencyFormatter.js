export function formatCurrency(amount) {
    return new Intl.NumberFormat("fr-CM", {
        style: "currency",
        currency: "XAF",
        maximumFractionDigits: 0
    }).format(amount);
}
