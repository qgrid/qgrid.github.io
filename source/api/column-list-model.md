---
title: ColumnListModel
type: api
group: API
order: 10
---
Use this class to order and generate q-grid columns.

{% docTable "source/api/column-list-model.json" %}

### Setup column generation mode in html.

```html
<q-grid>
   <q-grid-columns generation="deep">
   </q-grid-columns>
</q-grid>
```

### Add one column to the qgrid.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="number" canSort="false" canFilter="false"></q-grid-column>
   </q-grid-columns>
</q-grid>
```


### Suggested Links

* [Column Model](/doc/api/column-model.html)
* [Column Sort](/doc/feature/sort.html)
* [column.list.generate.js](https://github.com/qgrid/ng2/blob/master/core/column-list/column.list.generate.js)
* [column.list.sort.js](https://github.com/qgrid/ng2/blob/master/core/column-list/column.list.sort.js)


