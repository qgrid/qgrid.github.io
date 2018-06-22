---
title: Cell Templates
group: Features
order: 3
---

The preferred way to define cell templates is to you `ng-template` inside the `q-grid-column` component. Use `head`, `body`, `foot` and `edit` triggers to fill in the appropriate cell containers.

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
		 		   style="width: 100%"
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

## $view service

Use this to take control over necessary actions. `$view` service is a facade for several micro utilities that are responsible for the q-grid rendering and interaction model.  Here are the list of available utilities:

* body
* edit
* filter
* foot
* group
* head
* highlight
* layout
* nav
* pagination
* pivot
* row
* rowDetails
* scroll
* selection
* sort
* style