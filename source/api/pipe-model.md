---
title: PipeModel
type: api
group: API
order: 153
---
A class that contains setting to control when and how q-grid should be updated.

{% docTable "source/api/pipe-model.json" %}

## Default Triggers
```javascript
 {
	   'data': {
	      'rows': PU.default,
		  'columns': PU.column
	   'pagination': {
		  'current': PU.default,
		  'size': PU.default
		},
		'fetch': {
		   'skip': PU.default,
		   'round': PU.default
		},
		'sort': {
		   'by': PU.default
		},
		'filter': {
		   'by': PU.default,
		   'unit': PU.column
		},
		'group': {
		   'by': PU.default
		},
		'pivot': {
		   'by': PU.default
		},
		'columnList': {
		   'index': PU.column
		},
		'row': {
		   'status': PU.rowDetails,
        'canDrag': PU.column,
        'canResize': PU.column
		},
		'selection': {
		   'mode': PU.column,
		   'unit': PU.column
		}
 };
```

