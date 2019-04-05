---
title: Array
group: Column Types
order: 1
---

Array type is utilized by the q-grid to visualize primitive type collections. If complex object list should be visualized, it's required to setup `itemLabel` property or make custom cell templates.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="array" key="friends">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-array-basic/latest" %}

## Default template and specific properties

* Use `itemType` to setup array element type, could be used to populate correct input in the array editor.
* Use `itemFormat` to setup array element format string, could be used to build correct item presentation.
* Use `itemLabel` to setup a callback that returns a custom array element text.
* `label` property is used to convert array to string.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="array">
         <ng-template for="body" let-$cell>
            <ul>
               <li *ngFor="let item of $cell.value | qGridArray">
                  {{$cell.column.itemLabel(item)}}
               </li>
            </ul>
         </ng-template>
      </q-grid-column>
</q-grid>
```