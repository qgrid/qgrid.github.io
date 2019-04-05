---
title: Data Middleware
group: Reference
order: 3
---

The q-grid pipe is a series of methods that grid invokes asynchronously anytime refresh is required. Every pipe in the series gets data from previous one, handles it and passes to the next one. This basic concept allows to modify how data rows are processed to display the data. Here is the default pipeline:

```typescript
[
   qgrid.pipe.data,
   qgrid.pipe.filter,
   qgrid.pipe.sort,
   qgrid.pipe.memo,
   qgrid.pipe.group, 
   qgrid.pipe.pivot,
   qgrid.pipe.column,
   qgrid.pipe.pagination,
   qgrid.pipe.view
];
```

## The Scene

A class that contains the q-grid pipe results, actually `qgrid.pipe.view` pipe fills the scene, further the q-grid renderer outputs rows and columns using the scene model. Another attribute of the scene is `status`, it's used by internal routines to manage the q-grid readiness.
