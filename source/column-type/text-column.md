---
title: Text
group: Column Types
order: 9
---

This is a basic data column type that is responsible for handling textual values.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="text" key="lastName">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-text-basic/latest" %}

## Default template and specific properties

* Add `editor="text-area"` to the q-grid column to display multi-line text in the cell.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="text">
         <ng-template for="body" let-$cell>	
           {{$cell.label}}
         </ng-template>
      </q-grid-column>
</q-grid>
```

## How to fit text to column width?

Often cells contain text that is not fit to default column width by setting up `viewWidth` column will expand the width of focus.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="text" [viewWidth]="300">
      </q-grid-column>
</q-grid>
```
