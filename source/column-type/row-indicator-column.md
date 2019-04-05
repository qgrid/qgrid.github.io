---
title: Row Indicator
group: Column Types
order: 8
---

Row indicator belongs to the `control class` columns. It can be used in different scenarios belonging to the data rows.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="row-indicator" key="rowIndicator">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-row-indicator-basic/latest" %}

## Row Number

To display row number this column type can be used.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="row-number" key="rowNumber">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-row-number-basic/latest" %}

## Default template and use cases

 * `Selection` utilizes row-indicator column type to support `mix` mode when both rows and cells can be selected. 
 * `Data manipulation` plugin applies color coding to the row-indicator cells when appropriate rows were changed or deleted. 
 * `Row drag` and `row resize` modes creates row-indicator column to show drag handlers.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="row-indicator">
        <ng-template for="body" let-$cell let-$view="$view">	
          <ng-container *ngIf="$view.row.canMove">
            <div [q-grid-drag]="$view.row.drag"
                 [q-grid-drag-data]="$cell.rowIndex"
                 q-grid-drop-area="body">
                    <mat-icon class="q-grid-icon">drag_indicator</mat-icon>
            </div>
          </ng-container>
          <ng-container *ngIf="$view.row.canResize">
            <div [q-grid-drag]="$view.row.resize"
                 [q-grid-resize]="$cell.row"
                 q-grid-resize-path="rows"
                 [q-grid-can-resize]="$view.row.resize.canExecute">
            </div>
          </ng-container>         
        </ng-template>
      </q-grid-column>
</q-grid>
```