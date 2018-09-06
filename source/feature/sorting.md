---
title: Sorting
group: Features
order: 12
---

Use `+` and `-` symbols to identify the direction of sorting. By default multiple sorting priority depends on column order to apply priority by click events reset `sortTrigger` array.

```html
<q-grid [sortBy]="['+gender', '-name.last']" [sortTrigger]="[]"></q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/sort-row-basic/latest" %}
