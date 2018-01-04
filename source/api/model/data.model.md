---
title: DataModel
type: api
group: API
---
A class that gives access to the high level grid data structures.

Property|Type|Description
---|---|---
columns|`array<ColumnModel>`|Set of columns to display.<br />Columns property usually can be setup from the grid columns binding.<br />List of columns inside html template is stored here too.<br />We can have two+ sources of columns because it's possible to do merge using column `key` property.<br />If you have defined columns in javascript and in template with the same key,<br />algorithm will try persist settings from both sources but javascript will have top priority.
pipe|`array<IPipe>`|Chaing of methods that grid invokes asyncroniuosly anytime refresh is required.<br />see `PipeModel` that contains information when grid demands refreshing.
rows|`array<any>`|List of rows to display.<br />Rows property usually can be filled from the grid rows html.

[file in github](https://github.com/qgrid/ng2/core/data.model.js)
