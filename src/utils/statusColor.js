const statusColor = (status) => {
    switch (status) {
        case 'done':
            return 'success';
        case 'issued':
            return 'warning';
        case 'processed':
            return 'primary';
        default:
            return 'info';
    }
};
export default statusColor;
