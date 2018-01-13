---
title: DataModel
type: api
group: API
order: 45
---
A class that gives access to the high level grid data structures.

{% docTable "source/api/data-model.json" %}

## Usage
Usually grid user can define this properties in different places.
Inside html through attribute bindings:
```html
<q-grid [columns]="userColumns" [rows]="userRows">
```

Inside html throught component:
```html
<q-grid>
	<q-grid-columns>
		<q-grid-column key="id"></q-grid-column>
		<q-grid-column key="name"><q-grid-column>
	</q-grid-columns>
</q-grid>
```

Inside js code throught model:
```javascript
const userRows = [];
const userColumns = [];

gridModel.data({
 rows: userRows,
 columns: userColumns
})
```

