import React from 'react';
import classnames from 'classnames';

const formatNumber = (number, maxChars) => {
    if(number === 0) return number;
    const amountOfDigits = Math.floor(Math.log10(number))+1;
    const suffixed = Math.floor((amountOfDigits-1)/3);
    const beforeSuffixAmount = amountOfDigits - suffixed*3;
    let afterCommaChars = 0;
    if(suffixed > 0) {
        afterCommaChars = Math.max(maxChars - beforeSuffixAmount, 0);
    }
    const clearPart = number/Math.pow(10, suffixed*3);
    let suffix;
    switch (suffixed) {
        case 0:
            suffix = '';
            break;
        case 1:
            suffix = 'K';
            break;
        case 2:
            suffix = 'M';
            break;
        case 3:
            suffix = 'B';
            break;
        case 4:
            suffix = 'T';
            break;
        case 5:
            suffix = 'Qa';
            break;
        case 6:
            suffix = 'Qi';
            break;
        case 7:
            suffix = 'Sx';
            break;
        case 8:
            suffix = 'Sp';
            break;
        case 9:
            suffix = 'Oc';
            break;
        case 10:
            suffix = 'No';
            break;
        case 11:
            suffix = 'Dc';
            break;
        case 12:
            suffix = 'UDc';
            break;
        case 13:
            suffix = 'DDc';
            break;
        case 14:
            suffix = 'TDc';
            break;
        case 15:
            suffix = 'QDc';
            break;
        default:
            suffix = `S${suffixed}`
    }
    if(!afterCommaChars) return `${Math.round(clearPart)}${suffix}`;
    return `${clearPart.toFixed(afterCommaChars)}${suffix}`;
}

const BigNumber = ({value, maxChars = 3, className}) => (<span className={classnames(className)}>{formatNumber(value, maxChars)}</span>);

export default BigNumber;
