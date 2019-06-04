---
title: Pivoting
group: Features
order: 8
---

Use `pivotBy` attribute and aggregates to setup pivoting columns. Also it's supported to use cohort columns and group within pivoting. To override basic cell template use `ng-template` as always.

```html
<q-grid [pivotBy]="['bondingType', 'groupBlock']">
   <q-grid-columns>
      <q-grid-column type="pivot">
         <ng-template for="body" let-$cell>
            <div [style.color]="'#' + $cell.row.color">X</div>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/pivot-column-template/latest" %}
