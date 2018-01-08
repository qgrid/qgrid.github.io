---
title: ActionModel
type: api
group: API
order: 0
---
A class to handle and visualize custom user behaviors(like add or delete row). Action bar plugin uses this model to draw buttons to execute commands.
```html
<q-grid>
 <q-grid-action-bar>
   <q-grid-action title="Add Row" command="userAddRowCommand"></q-grid-action>
 <q-grid-action-bar>
<q-grid>
```


Property|Type|Description
---|---|---
items|`array<Action>`|List of actions that will be added to the command manager.
manager|`CommandManager`|Command manager is responsible for the next questions:<br />1. What commands can be executed.<br />2. How(e.g. in which order) commands should be executed.
shortcut|`Shortcut`|This service connects keydown events with commands.

[file in github](https://github.com/qgrid/ng2/core/action.model.js)
