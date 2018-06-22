---
title: Cell Templates
group: Features
order: 3
---

## Cell templates

The preferred way to define cell templates is to you `ng-template` inside the `q-grid-column` component. 

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

{% docEditor "github/qgrid/ng2-example/tree/column-number-basic/latest" %}

## Column types

* `array`

* `bool`

* `currency`
* `number`

* `date`

* `email`
* `url`

* `image`
* `file`

* `id`

* `reference`

* `row-indicator`
* `row-number`

* `row-options`

* `text`

* `time`
