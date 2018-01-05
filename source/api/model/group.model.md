---
title: GroupModel
type: api
group: API
---
A class that allows to apply some hierarchy to the grid.<br />However user is allowed to write any kind of custom hierarchies just by overriding default pipe and<br />working with `Node` object from the grid service.

Property|Type|Description
---|---|---
by|`array<string>`|List of column keys to build appropriate hierarchy.<br />Each item represents next level.
mode|`string`|How grid will render nodes:<br />1. `column` - all hierarchy levels inside one group type column.<br />2. `subhead` - group column try to use all available space to display hierarchy.<br />3. `rowspan` -

[file in github](https://github.com/qgrid/ng2/core/group.model.js)
