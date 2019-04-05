---
title: Boolean
group: Column Types
order: 2
---

Three state booleans are supported by the q-grid.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="bool" key="hasFriends">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-bool-basic/latest" %}

## Default template and specific properties

* Use `trueValue` property to override the positive meaning.  
* Use `falseValue` property to override the negative meaning.
* Use `isIndeterminate` function to setup the undefined meaning.
* Use `isChecked`  function to setup boolean comparison.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="bool">
         <ng-template for="body" let-$cell>
             <mat-icon class="q-grid-icon" *ngIf="$cell.value === $cell.column.trueValue">
               check
            </mat-icon>
            <mat-icon class="q-grid-icon" *ngIf="$cell.column.isIndeterminate($cell.value)">
               remove
            </mat-icon>
         </ng-template>
      </q-grid-column>
</q-grid>
```

## How to prevent value change on cell click?

* Use `[editorOptions]` trigger property by default the value is `click`, change it to `focus`.

```html
<q-grid-column type="bool" [editorOptions]="{trigger: 'focus'}"></q-grid-column>
```