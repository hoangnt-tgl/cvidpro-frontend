export const displaySalary = (from, to) => {
    if (from && to) {
        return `Từ ${from} - đến ${to}`;
    } else if (from) {
        return `Từ ${from}`;
    } else if (to) {
        return `Đến ${to}`;
    } else {
        return "Thương lượng";
    }
}