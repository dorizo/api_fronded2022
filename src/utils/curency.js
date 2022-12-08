/* eslint-disable prefer-const */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */

export default function convertToRupiah(angka) {
    if (angka === undefined) {
        return null;
    }
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return (
        'Rp. ' +
        rupiah
            .split('', rupiah.length - 1)
            .reverse()
            .join('')
    );
}
