---
title: Cell Templates
group: Features
order: 2
---

There are situations when the end user need to apply custom templates to the column cells in the q-grid. The q-grid provides clean and intuitive solution for this case. The preferred way to define a cell template is to you `ng-template` inside the `q-grid-column` component. Use `head`, `body`, `foot` and `edit` triggers to fill in the appropriate cell containers.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="age" title="Age" type="number">
         <ng-template for="body" let-$cell>
            <em>{{$cell.value}}</em>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## How to change column header template?

```html
<q-grid>
   <q-grid-columns>
      <ng-template for="head" let-$cell>
      <q-grid-column key="age" title="Age" type="number">
            <q-grid-column-sort class="q-grid-sort"
                                [column]="$cell.column">
                  <label [matTooltip]="$cell.column.description">
                     {{$cell.column.title}}
                  </label>
            </q-grid-column-sort>
            <q-grid-column-filter-trigger class="q-grid-column-filter-trigger"                                       
                                          [column]="$cell.column">
            </q-grid-column-filter-trigger>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## How to change cell editor template?

Edit templates are in game when q-grid enters to the edit mode.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="age" title="Age" type="number">
         <ng-template for="edit" let-$cell let-$view="$view">
            <input type="number"
                   q-grid-focus
                   [(ngModel)]="$view.edit.cell.value"
                   (blur)="$view.edit.cell.exit.execute($cell)" />
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## Suggested Links

* [$cell service](/reference/cell-service.html)
* [$view service](/reference/view-service.html)
* [Column Types](/column-type/grid-column.html)