export const tableOption = {
    sell: {
        columns: [
            {
                label: 'Nama Product',
                key: 'productName'
            },
            {
                label: 'Qty',
                key: 'qty'
            },
            {
                label: 'Harga',
                key: 'price',
                type: 'currency'
            },
            {
                label: 'PPN',
                key: 'ppn'
            },
            {
                label: 'Total',
                key: ['price', 'qty', 'ppn'],
                align: 'right',
                type: 'currency'
            }
        ]
    }
};

export default { tableOption };
