---
title: Action
type: api
group: API
order: 0
---
Use this class to connect q-grid [command](/doc/api/command.html) and UI. Usually action represents a button, but not necessary, custom template can be [used to](/doc/features/action-bar).
Note that even action doesn't populate UI, command should be still executable through the keyboard shortcut.

{% docTable "source/api/action.json" %}

### Create an action.

```javascript
this.addRowCommand =
		new qgrid.Action(
			new qgrid.Command({
		  		execute: () => {
		     		const newRow = { id: 1, text: 'Lorem ipsum dolor sit amet' };
                 this.rows = this.rows.concat(newRow);
		   		},
			}),
			'Add Row'
		);
```

### Suggested Links

* [Action Model](/doc/api/action-model.html)
* [Command](/doc/api/command.html)
* [Action Bar](/doc/feature/action-bar.html)
* [Grid Front](/doc/api/front.html)

