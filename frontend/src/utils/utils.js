import _ from 'lodash';
import moment from 'moment';
import { ROLE_BRANCH, ROLE_COMPANY, ROLE_SUPERADMIN } from '../store/static/roles';

export const formatCurrency = (value) => {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
};

export const formatCurrencyPrint = (value) => {
    if (value === '' || value === null || value === undefined) return 'Rp 0';
    return new Intl.NumberFormat('in-IN', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 2
    }).format(value);
};

export const handleDataPrint = (data, key, type = '') => {
    let value = data[key];
    if (_.isArray(key)) {
        value = data[key[0]] * data[key[1]];
        let tax = data[key[2]];
        value = value * (1 - tax);
    }
    if (type == 'currency') value = formatCurrencyPrint(value);
    return value;
};

export const formatDate = (date, format = 'DD MMMM YYYY', locale = '') => {
    if (!date) return '-';
    let momentDate = moment(date);
    if (locale) momentDate = momentDate.locale(locale);
    if (format) momentDate = momentDate.format(format);
    return momentDate;
};

export const formatDateIso = (date) => {
    return moment(date).add('hours', new Date().getHours()).add('minutes', new Date().getMinutes()).add('seconds', new Date().getSeconds()).utc().toISOString();
};

export const checkErrorResponse = (data) => {
    let msg = '';
    if (typeof data === 'object' && data.detail) msg = data.detail.message ? checkErrorResponse(data.detail.message) : data.detail.type;
    else if (typeof data === 'string') msg = data;
    return msg;
};

export const getRole = () => {
    let data = {};
    if (!sessionStorage.getItem('auth')) return '';
    data = JSON.parse(sessionStorage.getItem('auth'));
    let role = '';
    if (ROLE_COMPANY.includes(data.userLogin.role)) role = 'company';
    if (ROLE_SUPERADMIN.includes(data.userLogin.role)) role = 'super';
    if (ROLE_BRANCH.includes(data.userLogin.role)) role = 'branch';
    console.log(role, data.userLogin.role);
    return role;
};

export const getRoles = (level) => {
    console.log(level, 'level');
    switch (level) {
        case 0:
            return _.map(ROLE_SUPERADMIN, (el) => ({
                value: el,
                label: el.replaceAll('_', ' ')
            }));
        case 2:
            return _.map(ROLE_COMPANY, (el) => ({
                value: el,
                label: el.replaceAll('_', ' ')
            }));
        case 3:
            return _.map(ROLE_BRANCH, (el) => ({
                value: el,
                label: el.replaceAll('_', ' ')
            }));
        default:
            return [];
    }
};
export const replaceAt = (text = '', index, replacement) => {
    return text.substring(0, index) + replacement + text.substring(index + replacement.length);
};

export default { formatCurrency, checkErrorResponse, formatCurrencyPrint, formatDate, handleDataPrint, getRole, getRoles, replaceAt };
