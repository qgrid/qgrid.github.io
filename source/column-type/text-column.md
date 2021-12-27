---
title: Text
group: Column Types
order: 11
---
- [Default template and specific properties](#default-template-and-specific-properties)
- [How to fit text to column width?](#how-to-fit-text-to-column-width)

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

<a name="#default-template-and-specific-properties">
   Default template and specific properties
</a>

* Add `editor="text-area"` to the q-grid column to display multi-line text in the cell.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="text">
         <ng-template for="body" let-$cell>	
           {{$cell.label}}
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

<a name="#how-to-fit-text-to-column-width">
   How to fit text to column width?
</a>

Often cells contain text that is not fit to default column width by setting up `viewWidth` column will expand the width of focus.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="text" [viewWidth]="300">
      </q-grid-column>
</q-grid>
```
