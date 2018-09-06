---
title: Sorting
group: Features
order: 12
---

Use q-grid sorting model to sort single and multiple data-bound columns.

## Direction
Use `+` and `-` symbols to identify the direction of sorting.

```html
<q-grid [sortBy]="['+gender', '-name.last']"></q-grid>
```

## Multiple column sorting

By default multiple sorting order depends on column order, to apply order by click `sortTrigger` array should be reset.

```javascript
myGridModel.sort({
   resetTrigger: []
});
```

{% docEditor "github/qgrid/ng2-example/tree/sort-row-basic/latest" %}
