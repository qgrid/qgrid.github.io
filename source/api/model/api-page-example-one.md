---
title: API Page Example One
type: api
group: API
order: 100
github: qgrid/ng2/blob/master/core/data/data.model.js
---
### Description

A class that gives access to the high level grid data structures.

### Interface

Property|Type|Description
---|---|---
columns|`array<ColumnModel>`|Set of columns to display.<br /><br />Usually data columns can be setup from 3 places:<ol><li>Columns binding property</li><li>Columns component</li><li>Grid model data columns property</li></ol>We can have 3 sources of columns because each column has `key` property, that allows to make a merge. If you have defined columns in javascript and in template with the same key, algorithm will try persist settings from both sources but javascript will have top priority.
pipe|`array<IPipe>`|Chaing of methods that grid invokes asyncroniuosly anytime refresh is required, see `PipeModel` that contains information when grid demands refreshing.
rows|`array<any>`|List of rows to display.<br /><br />Rows property can be filled from the grid rows html or grid model data rows property.

### Usage

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
