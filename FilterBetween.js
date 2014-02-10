/**
 * Created by Mateusz Lisik
 * matteprl@gmail.com
 */
Ext.define('Ext.ux.util.FilterBetween', {
    alias: 'plugin.filter-between',
    extend: 'Ext.util.Filter',
    statics: {
        isProxyOverridden: false
    },
    operator: 'between',
    config: {
        property: null,
        valueFrom: null,
        valueTo: null,
        dontOverrideProxy: false
    },

    constructor: function (config) {
        this.initConfig(config);
        if (this.canOverrideProxy()) {
            this.overrideProxy();
            Ext.ux.util.FilterBetween.isProxyOverridden = true;
        }
    },
    overrideProxy: function () {
        Ext.override(Ext.data.proxy.Server, {
            encodeFilters: function (filters) {
                var objectsForEncoding = [];
                Ext.Array.each(filters, function (filter) {
                    var filterObject = {
                        property: filter.property,
                        operator: filter.operator || 'like'
                    };

                    if (filter.operator === 'between') {
                        filterObject.valueFrom = filter.valueFrom;
                        filterObject.valueTo = filter.valueTo;
                    } else {
                        filterObject.value = filter.value;
                    }

                    if (Ext.isDefined(filter.type)) {
                        filterObject.type = filter.type;
                    }

                    objectsForEncoding.push(filterObject);
                });
                return this.applyEncoding(objectsForEncoding);
            }
        });
    },
    canOverrideProxy: function () {
        return !this.dontOverrideProxy && !Ext.ux.util.FilterBetween.isProxyOverridden;
    }
});