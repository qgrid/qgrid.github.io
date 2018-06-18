---
title: Command
type: api
group: API
order: 44
---
Use this class to implement command pattern in the qgrid. The most of interactions in the qgrid are utilized by this pattern.

{% docTable "source/api/command.json" %}

### Create a command using qgrid facade.

```javascript
	const addRowCommand = new qgrid.Command({
	   canExecute: () => true,
	   execute: () => {
	      const newRow = {
			 id: 1,
			 text: 'Lorem ipsum dolor sit amet'
	      };

		  gridModel.data({
			 rows: gridModel.data().rows.concat(newRow)
		  });
	   },
	   shortcut: 'F7'
 });
```

### Suggested Links.

* [Action Model](/doc/api/action-model.html)
* [Action](/doc/api/action.html)
* [Service](/doc/api/grid.html)
* [Command Pattern Wiki](https://en.wikipedia.org/wiki/Command_pattern)

