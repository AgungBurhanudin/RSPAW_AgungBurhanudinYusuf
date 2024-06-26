import _ from 'lodash';

export const mappingCombo = (arr, from = ['id', 'name'], to = ['value', 'label']) => {
    return _.map(arr, (el) => ({
        [to[0]]: el[from[0]],
        [to[1]]: el[from[1]]
    }));
};

export default { mappingCombo };
