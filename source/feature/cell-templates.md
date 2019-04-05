---
title: Cell Templates
group: Features
order: 3
---

There are situations when the end user need to apply custom templates to the column cells in the q-grid. The q-grid provides clean and intuitive solution for this case. 

## ng-template

The preferred way to define a cell template is to you `ng-template` inside the `q-grid-column` component. Use `head`, `body`, `foot` and `edit` triggers to fill in the appropriate cell containers.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="age" title="Age" type="number">
         <ng-template for="body" let-$cell>
            <em>{{$cell.value}}</em>
         </ng-template>
         <ng-template for="head" let-$cell>
            <strong>{{$cell.column.title}}</strong>
         </ng-template>
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

## $cell service

Use this implicitly injected service to retrieve data cell information. Here are the list of available properties:

* value
* label
* row
* rowIndex
* column
* columnIndex

## Suggested Links

* [$view service](/reference/view-service.html)
