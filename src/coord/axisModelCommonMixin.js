define(function (require) {

    var numberUtil = require('../util/number');
    var formatUtil = require('../util/format');
    var zrUtil = require('zrender/core/util');

    function categoryDefaultFormatter(val) {
        return val;
    }

    // function getName(obj) {
    //     if (typeof obj === 'string') {
    //         return obj;
    //     }
    //     return obj.name;
    // }
    /**
     * Get categories
     */
    // function getCategories() {
    //     return this.get('type') === 'category'
    //         && zrUtil.map()
    // }

    /**
     * Format labels
     * @param {Array.<string>} labels
     * @return {Array.<string>}
     */
    function formatLabels (labels) {
        var labelFormatter = this.get('axisLabel.formatter');

        if (!labelFormatter) {
            switch (this.get('type')) {
                case 'category':
                    labelFormatter = categoryDefaultFormatter;
                    break;
                case 'time':
                    labelFormatter = function (time) {
                        return time;
                    };
                    break;
                default:
                    labelFormatter = function (val) {
                        return formatUtil.addCommas(numberUtil.round(val));
                    };
            }
        }
        else if (typeof labelFormatter === 'string') {
            labelFormatter = (function (tpl) {
                return function (val) {
                    return tpl.replace('{value}', val);
                };
            })(labelFormatter);
        }

        return zrUtil.map(labels, labelFormatter);
    }

    return {
        formatLabels: formatLabels
    };
});