---
title: ColumnListModel
type: api
group: API
order: 10
---
A class that responsible for the columns order and generation. Usually user does not interact directly
with this model as the q-grid uses this in internal pipelines.

{% docTable "source/api/column-list-model.json" %}

### Usage

* Example of how user usually can define column generation type and list of columns in template.

```html
<q-grid>
   <q-grid-columns generation="deep">
      <q-grid-column key="myKey"></q-grid-column>
   </q-grid-columns>
</q-grid>
```

* Example of how user usually can define some options for the all columns of appropriate type.

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


