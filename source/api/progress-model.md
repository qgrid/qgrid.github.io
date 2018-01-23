---
title: ProgressModel
type: api
group: API
order: 167
---
A class representing the q-grid job state.

{% docTable "source/api/progress-model.json" %}

### Usage

In general this model is not modified directly, consider to [grid service](`/doc/api/grid-service.html`).

```javascript
	const gridModel = qgrid.model();
	const service = qgrid.service(gridModel);
	const cancelBusy = service.busy();

	new Promise(resolve => {
	   cancelBusy();
    resolve()
	});
```

