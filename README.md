Ext.ux.util.FilterBetween
=========================

This simple util allows make range filters for ExtJS Store with remote proxy

Example:
-------------------------
```javascript
            var myFilter = Ext.create('Ext.ux.util.FilterBetween', {
                property:  'user_registered',
                valueFrom: '2012-01-01',
                valueTo:   '2013-01-01'
            });
            this.getStore().addFilter(myFilter, true); // Apply filter and reload store
```
As simple as that.<br/>
Fell free to fork, send updates and bug reports.

