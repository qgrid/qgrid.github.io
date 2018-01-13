---
title: ColumnListModel
type: api
group: API
order: 9
---
A class that responsible for the generation and order of columns.

{% docTable "source/api/column-list-model.json" %}

## Usage

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

