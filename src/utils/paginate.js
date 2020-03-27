import _ from 'lodash';

/**
 *
 * @param items
 * @param pageNumber
 * @param pageSize
 */
export default function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber -1) * pageSize;
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
    // _.slice(items, startIndex)
    // _.take(items, startIndex)
}
