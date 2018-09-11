---
title: Row Details
group: Features
order: 9
---

There are situations when the end user need to show additional information for the rows in the q-grid. Row details serves to satisfy this necessary.

## Setup

Use q-grid html component to setup row details options and template.

```html
<q-grid>
   <q-grid-row unit="details" mode="multiple">
      <ng-template for="details" let-$cell>
         {{$cell.row.item.number}}
      </ng-template>
   </q-grid-row>
</q-grid>
```

> In the details template to get access to the data row `$cell.row.item` expression need to be used.

Or use q-grid model directly.

```javascript
gridModel.row({
   unit: 'details',
   mode: 'all'
});
```

## Details model

The q-grid renderer utilizes `RowDetails` class to add details rows into the scene model.

```typescript
declare class RowDetails {
   item: any;
   column: Column;
}
```

> Note that style API along with data rows will propagate `RowDetails` class to the end user for each expanded row.

## Row details modes

Use row `mode` option to configure row details expand/collapse behavior.

* Use `single` mode to restrict number of expanded details to one.
* Use `multiple` mode to allow expanding of several rows.
* Use `all` mode to expand all rows and to not allow to collapse them.

{% docEditor "github/qgrid/ng2-example/tree/details-row-all/latest" %}