---
title: Cell Service
type: guide
group: Reference
order: 5
---

Use this implicitly injected service to retrieve data cell information, it contains next properties.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="number">
         <ng-template for="body" let-$cell>
            {{$cell.value}}
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

* value
* label
* row
* rowIndex
* column
* columnIndex
