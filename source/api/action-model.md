---
title: ActionModel
type: api
group: API
order: 1
---
A class to handle and visualize in UI custom user behaviors(like add or delete row).
For instance, [action bar](/doc/feature/action.html) plugin uses this model to draw buttons on top of the q-grid
to execute user commands.

{% docTable "source/api/action-model.json" %}

### Usage

```javascript
	const addRowCommand = new qgrid.Command({
	   execute: () => {
	      const newRow = {
			 id: 1,
			 text: 'foo'
	      };

       gridModel.data({
         rows: gridModel.data().rows.concat(newRow)
       });
	   },
	   shortcut: 'F7'
	});

 const addRowAction = new qgrid.Action({
    command: addRowCommand,
    title: 'Add new row',
    icon: 'add'
 });

 gridModel.action({
    items: [addRowAction]
 });
```

### Suggested Links

* [Action](/doc/api/action.html)
* [Command](/doc/api/command.html)
* [Action Bar](/doc/feature/action.html)
* [Shortcut](/doc/api/shortcut.html)
* [Command Manager](/doc/api/command-manager.html)

