---
title: Cell Templates
group: Features
order: 3
---

To apply cell custom templates use `ng-template` with a new style `qGridColumnHead`, `qGridColumnBody`, `qGridColumnFoot`, `qGridColumnEdit` directives.

```html
<q-grid>
   <ng-template qGridColumnBody="birthday" let-$cell>
      <em>{{$cell.value}}</em>
   </ng-template>
</q-grid>
```

## How to change column header template?

Default header template contains sort and filter components that could be used in custom templates also.

```html
<q-grid>
   <ng-template qGridColumnHead="age" let-$cell>
      <q-grid-column-sort class="q-grid-sort"
                          [column]="$cell.column">
         {{$cell.column.title}}
      </q-grid-column-sort>
      <q-grid-column-filter-trigger class="q-grid-column-filter-trigger"                                       
                                    [column]="$cell.column">
      </q-grid-column-filter-trigger>
   </ng-template>
</q-grid>
```

## How to change cell editor template?

Edit templates are in game when q-grid enters to the edit mode.

```html
<q-grid>
   <ng-template qGridColumnEdit="age" let-$cell let-$view="$view">
      <input type="number"
             q-grid-focus
             [(ngModel)]="$view.edit.cell.value"
             (blur)="$view.edit.cell.exit.execute($cell)" />
   </ng-template>
</q-grid>
```

## How to change aggregation template in the column footer?

Use let-`$cell` to have access to aggregated value, it will work when `aggregation` property is setup for the column.

```html
<q-grid [rows]="rows$ | async">
   <ng-template qGridColumnFoot="phase" let-$cell>
      Count is {{$cell.value}}
   </ng-template>
</q-grid>
```

## How to implement custom aggregation in the column footer?

Use footer template and your custom function from the component.

```html
<q-grid [rows]="rows$ | async">
   <ng-template qGridColumnFoot="phase" let-$cell>
      Diff: {{getDiffFor('phase')}}
   </ng-template>
</q-grid>
```

## Suggested Links

* [$cell service](/reference/cell-service.html)
* [$view service](/reference/view-service.html)
* [Column Types](/column-type/grid-column.html)