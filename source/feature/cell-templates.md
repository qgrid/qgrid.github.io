---
title: Cell Templates
group: Features
order: 3
---

- [How to change column header template?](#how-to-change-selection-mode)
- [How to change cell editor template?](#how-to-change-cell-editor-template)
- [How to change aggregation template in the column footer?](#how-to-change-aggregation-template-in-the-column-footer)
- [Suggested Links](#suggested-links)

To apply custom template to the cell use `ng-template` along with `qGridColumnHead`, `qGridColumnBody`, `qGridColumnFoot`, `qGridColumnEdit` directives.

```html
<q-grid>
   <ng-template qGridColumnBody="birthday" let-$cell>
      <em>{{$cell.value}}</em>
   </ng-template>
</q-grid>
```

<a name="how-to-change-column-header-template" href="#how-to-change-column-header-template">
   How to change column header template?
</a>

Default header template contains sort and filter components that could be used in custom templates also.

```html
<q-grid>
   <ng-template qGridColumnHead="age" let-$cell>

      <q-grid-column-sort [column]="$cell.column" class="q-grid-sort">
         {{$cell.column.title}}
      </q-grid-column-sort>

      <q-grid-column-filter-trigger [column]="$cell.column" class="q-grid-column-filter-trigger">
      </q-grid-column-filter-trigger>

   </ng-template>
</q-grid>
```

<a name="how-to-change-cell-editor-template?" href="#how-to-change-cell-editor-template?">
   How to change cell editor template?
</a>

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

<a name="how-to-change-aggregation-template-in-the-column-footer" href="#how-to-change-aggregation-template-in-the-column-footer">
   How to change aggregation template in the column footer?
</a>

Use let-`$cell` to have access to aggregated value, it will work when `aggregation` property is setup for the column.

```html
<q-grid [rows]="rows$ | async">
   <ng-template qGridColumnFoot="phase" let-$cell>
      Count is {{$cell.value}}
   </ng-template>
</q-grid>
```

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [$cell service](/reference/cell-service.html)
* [$view service](/reference/view-service.html)
* [Column Types](/column-type/grid-column.html)