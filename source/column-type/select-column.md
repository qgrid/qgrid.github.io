---
title: Select
group: Column Types
order: 10
---

This is a basic data column type that is responsible for handling textual values.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="select" key="isSelected">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## Default template

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="select">
         <ng-template for="body" let-$cell let-$view="$view">
               <mat-checkbox [indeterminate]="$view.selection.isIndeterminate($cell.row)"
                             [checked]="$view.selection.state($cell.row)"
                             [disabled]="!$view.selection.toggleRow.canExecute($cell.row)"
                             (change)="$view.selection.toggleRow.execute($cell.row)"
                             tabindex="-1"                              
                             class="q-grid-checkbox">
               </mat-checkbox>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```