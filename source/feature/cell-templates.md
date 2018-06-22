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

## Column types and classes

Column `type` is responsible for how the cell is drawn and how it behaves. Beside out of box column types it's possible to define own types. Here is a list of column types supported by the q-grid. Note that some of them are utilized for internal needs.

* `array`
* `bool`
* `cohort`
* `currency`
* `date`
* `email`
* `file`
* `filter-row`
* `group`
* `id`
* `image`
* `number`
* `pad`
* `pivot`
* `reference`
* `row-details`
* `row-expand`
* `row-indicator`
* `row-number`
* `row-options`
* `select`
* `summary`
* `text`
* `time`
* `url`

Column `class` is a functional type of the column. It responsible 

* `control` 
Behavior controllers (e.g. `select` type column).

* `data` real user data.
Data columns defined by the q-grid users.

* `markup` 
 Used for the internal markup needs (e.g. `pad` type column).

* `pivot`
Multi head pivot.

## Column Model

Here is a list of basic column properties, all them can be setup and in TypeScript and in HTML.

* `type`.
Column type is responsible for how the cell is drawn and how it behaves. Beside out of box column types it's possible to define own types. 

* `key`.
A column unique identifier, should be unique across all columns. If path is not setup, key property is used to retrieve a cell value.

* `title`.
Column header text, also can be shown as column tooltip, or used in plugins like column filter plugin.

* `value`, `label`.
Getter, setter for a cell value. If the value property is setup, it is used to get/set cell value. Indicates what text should be shown in the cell. If property is not set column value is used. Also `filter plugin` uses this property to show list of items and for filter application.

* `path`, `labelPath`.
Path to the value. Example is `address.phones.0.num`, if `path` property is setup, it is used to get/set cell value, but it has a lower priority than column `value` property.

* `pin`.
Indicates if column should be frozen. `left` or `right` is available.

* `class`.
A functional type of a the column.

* `editor`, `editorOptions`.
Editor type, will be shown in cell edit mode instead of default column type editor. For instance, it can be used for id type column 

```html
<q-grid-column type="id" editor="number"></q-grid-column>
```

* `width`, `maxWidth`, `minWidth`.
Width of the q-grid column. Can be setup in `pixels` like `<q-grid-column width="100"></q-grid-column>`.Can be setup in `percents` like `<q-grid-column width="20%"></q-grid-column>`. Percents are materialized only once on init, and depend on the q-grid size.	 
	
* `viewWidth`
If set, column width will be expanded to this value on focus.

* `widthMode`
Indicates how to calculate px from percentage: `relative` get whole grid width minus static px widths and apply percents. `absolute` get whole grid width and apply percents.  	 

* `canEdit`, `canResize`, `canSort`, `canMove`, `canFilter`, `canHighlight`, `canFocus`, `isVisible`.
Indicates if cells in the column are editable.

* `index`.
Indicates the order of the column. ORDER OF COLUMNS SOME NOTES.
	 
* `compare`.
This function is used by `column sort` pipe to order row values.

* `children`.
If children property is setup the column automatically becomes a group container.	 

```html
<q-grid-columns>
   <q-grid-column key="parent">
      <q-grid-column key="child-1"></q-grid-column>
      <q-grid-column key="child-2"></q-grid-column>
   </q-grid-column>
</q-grid-columns>
```