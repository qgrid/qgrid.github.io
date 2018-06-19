---
title: DataModel
type: api
group: API
order: 48
---
Use this class to get access to the high level q-grid data structures.

{% docTable "source/api/data-model.json" %}

### Usage
In html through attribute bindings:
```html
<q-grid [columns]="myColumns" [rows]="myRows">
</q-grid>
```

In html via component:
```html
<q-grid>
	<q-grid-columns>
		<q-grid-column key="id" title="ID" type="id"></q-grid-column>
		<q-grid-column key="myColumnKey" title="My Column Name"><q-grid-column>
	</q-grid-columns>
</q-grid>
```

In js code throught model:
```javascript
const myRows = [];
const myColumns = [];

gridModel.data({
 rows: myRows,
 columns: myColumns
});
```

### Suggested Links

* [qgrid Model](/doc/api/model)
* [Data Pipe](/doc/api/data-pipe)

