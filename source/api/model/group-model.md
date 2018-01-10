---
title: GroupModel
type: api
group: API
order: 14
---
A class that allows to apply some hierarchy to the grid.
However user is allowed to write any kind of custom hierarchies just by overriding default pipe and
working with `Node` object from the grid service.

Property|Type|Description<a class="github-link2" target="_blank" href="https://github.com/qgrid/ng2/tree/master/core/group/group.model.js"><span>group.model.js</span></a>
---|---|---
by|`string[]`|List of column keys to build appropriate hierarchy.<br />Each item represents next level.
mode|`string`|How grid will render nodes:<br />1. `column` - all hierarchy levels inside one group type column.<br />2. `subhead` - group column try to use all available space to display hierarchy.<br />3. `rowspan` -
