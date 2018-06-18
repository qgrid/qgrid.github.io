---
title: Action
type: api
group: API
order: 0
---
Use this class to connect qgrid [command](/doc/api/command.html) and UI.
Usually action represents a button, but not nessesary, custom template can be used to,
see [action bar example](/doc/features/action-bar). If action doesn't populate UI,
command still is executable through the keyboard shortcut.

{% docTable "source/api/action.json" %}

### Create an action using qgrid facade.

```javascript
	const addRowCommand =
		new qgrid.Action(
	   		new qgrid.Command({
	  			execute: () => {
	     		const newRow = {
			 		id: 1,
			 		text: 'Lorem ipsum dolor sit amet'
	      		};

		 		gridModel.data({
			 		rows: gridModel.data().rows.concat(newRow)
		  		});
	   		}),
			'Add Row'
 	});
```

### Suggested Links

* [Action Model](/doc/api/action-model.html)
* [Command](/doc/api/command.html)
* [Action Bar](/doc/feature/action-bar.html)

