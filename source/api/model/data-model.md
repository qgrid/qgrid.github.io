---
title: DataModel
type: api
group: API
order: 5
---
A class that gives access to the high level grid data structures.
Usually grid user can define this properties in different places. Inside html through attribute bindings:
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


Property|Type|Description<a class="github-link2" target="_blank" href="https://github.com/qgrid/ng2/tree/master/core/data/data.model.js"><span>data.model.js</span></a>
---|---|---
columns|`ColumnModel[]`|Set of columns to display.<br />Usually data columns can be setup from 3 places: 1. Columns binding property.<br />2. Columns component.<br />3. Grid model data columns property.<br /><br />We can have 3 sources of columns because each column has `key` property,<br />that allows to make a merge. If you have defined columns in javascript and in template<br />with the same key, algorithm will try persist settings from both sources but<br />javascript will have top priority.<br />
pipe|`IPipe[]`|Chaing of methods that grid invokes asyncroniuosly anytime refresh is required,<br />see `PipeModel` that contains information when grid demands refreshing.
rows|`any[]`|List of rows to display.<br />Rows property can be filled from the grid rows html or grid model data rows<br />property.
