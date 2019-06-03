---
title: Cell Templates
group: Features
order: 3
---

There are situations when cell custom templates need to be applied. Use `ng-template` inside the `q-grid-column` and `head`, `body`, `foot`, `edit` options to identify template location.

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

Default header template contains sort and filter components that could be used in custom templates also.

```html
<q-grid>
   <q-grid-columns>     
      <q-grid-column key="age" title="Age" type="number">
         <ng-template for="head" let-$cell>
            <q-grid-column-sort class="q-grid-sort"
                                [column]="$cell.column">
               {{$cell.column.title}}
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