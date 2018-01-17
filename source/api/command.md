---
title: Command
type: api
group: API
order: 40
---
A class that implements command pattern in the q-grid.
Any q-grid actions are implemented through this pattern.

{% docTable "source/api/command.json" %}

### Instanciate a Command

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
```

### Suggested Links

* [Action Model](/doc/api/action-model.html)
* [Action](/doc/api/action.html)

