---
title: Column Types
group: Features
order: 5
---

The q-grid provides various column types to handle all possible data type values inside the columns.

## Array

Array type is utilized by the q-grid to visualize primitive type collections. Here are some specific properties:

* Use `itemType` to setup array element type, could be used to populate correct input in the array editor.
* Use `itemFormat` to setup array element format string, could be used to build correct item presentation.
* Use `itemLabel` to setup a callback that returns a custom array element text.

{% docEditor "github/qgrid/ng2-example/tree/column-array-basic/latest" %}

> If list of complex objects need to be visualized, it's required to setup `itemLabel` property or make custom cell templates.

## Bool

Three state booleans are supported by the q-grid. Here are some specific properties:

* Use `trueValue` property to override the positive meaning.  
* Use `falseValue` property to override the negative meaning.
* Use `isIndeterminate` function to setup the undefined meaning.
* Use `isChecked`  function to setup boolean comparison.

Use editor options to disable value change on the q-grid cell click.

```html
<q-grid-column type="bool" [editorOptions]="{trigger: 'focus'}"></q-grid-column>
```

{% docEditor "github/qgrid/ng2-example/tree/column-bool-basic/latest" %}

## Currency

Use this type to display decimal values in a currency format. Here are some specific properties:

* Use `code` property to set the ISO 4217 currency code, such as `USD` for the US dollar and `EUR` for the euro. The default is `USD`.

{% docEditor "github/qgrid/ng2-example/tree/column-currency-basic/latest" %}

## Date

Use this column type to display date or date times. Here are some specific properties:

* Use `format` property to build a date display value according to locale rules.

{% docEditor "github/qgrid/ng2-example/tree/column-date-basic/latest" %}

## Email

To show email links with appropriate editors this column type could be used. Note if `label` property is not null, default editor could contain 2 input fields, respectively for the value and for the label.

{% docEditor "github/qgrid/ng2-example/tree/column-email-basic/latest" %}

## File

Use file column type for uploading and linking files.

* Use `canUpload` function to setup predicate if a file is suitable for the uploading.
* Use `hasPreview` function to override predicate indicating if the uploading file is an image and can be displayed under the `img` tag. 

{% docEditor "github/qgrid/ng2-example/tree/column-file-basic/latest" %}

## Image

Use this column type to display and upload images.

* Use `canUpload` function to setup predicate if an image is suitable for the uploading.
* Use `hasPreview` function to override predicate indicating if the uploading image can be displayed under the `img` tag. 

{% docEditor "github/qgrid/ng2-example/tree/column-image-basic/latest" %}

## Id

> This is a beta column type in the future it could be used to define row id with appropriate behavior.

## Number

Use number type to display decimal values. Here are some specific properties:

* Use `format` property to transform a number into a string, formatted according to locale rules that determine group sizing and separator, decimal-point character, and other locale-specific configurations.

{% docEditor "github/qgrid/ng2-example/tree/column-number-basic/latest" %}

## Reference

Use this column type when need to handle reference values. The `reference value` term describes data which can be defined using a key/value pair relationship. For edit mode `modelFactory` can be used to configure reference selection.

```typescript
@Component({
    template: `
       <q-grid [rows]="rows">
          <q-grid-columns>
             <q-grid-column key="friends"
                            type="reference"                            
                            [editorOptions]="friendsReference">
          </q-grid-columns>
       </q-grid>
    `
})
export class MyComponent {
   friendsReference: EditorOptions = {
      modelFactory: ({ row, reference }) => {
         const model = this.qgrid.model();

         this.dataService
            .getFriends(row.myId)
            .subscribe(rows => model.data({ rows }));

        return model;
      }
   };
```

{% docEditor "github/qgrid/ng2-example/tree/column-reference-basic/latest" %}

## Row indicator

Row indicator belongs to the `control class` columns.

* `Selection` mode utilizes row-indicator column type to support `mix` mode when both rows and cells can be selected. 
* `Data manipulation` plugin applies color coding to the row-indicator cells when appropriate rows were changed or deleted.
* `Row drag` and `row resize` modes creates row-indicator column to show drag handlers.

{% docEditor "github/qgrid/ng2-example/tree/column-row-indicator-basic/latest" %}

## Row number

Use `row number` type to add left pinned column that displays row indices.

{% docEditor "github/qgrid/ng2-example/tree/column-row-number-basic/latest" %}

## Row options

Setup `editorOptions` property of the `row-indicator` column type to show list of the available actions for the appropriate row.

```typescript
@Component({
    template: `
       <q-grid [rows]="rows">
          <q-grid-columns>
             <q-grid-column key="rowIndicator"
                            type="row-indicator"                            
                            [editorOptions]="rowOptions">
          </q-grid-columns>
       </q-grid>
    `
})
export class MyComponent {
   rowOptions = {
	   actions: [
		   new Action(
			   new Command<{ row: Atom }>({
				   execute: cell => window.open(cell.row.wiki, '_blank')
			   }),
			   'Goto Wiki',
			   'link-icon'
		   )
	   ];
   };
}
```

{% docEditor "github/qgrid/ng2-example/tree/column-row-options-basic/latest" %}

## Text

This is a basic data column type that is responsible for handling textual values.

* Add `editor="text-area"` to the q-grid column to make cell display multi-line text.

{% docEditor "github/qgrid/ng2-example/tree/column-text-basic/latest" %}

## Time

Use number type to display time values in specific format.

{% docEditor "github/qgrid/ng2-example/tree/column-time-basic/latest" %}

## Url

To show url links with appropriate editors this column type could be used. Note if `label` property is not null, default editor could contain 2 input fields, respectively for the value and for the label.

{% docEditor "github/qgrid/ng2-example/tree/column-url-basic/latest" %}


## Suggested links

* [Angular currency pipe](https://angular.io/api/common/CurrencyPipe)
* [Angular decimal pipe](https://angular.io/api/common/DecimalPipe)
* [Angular date pipe](https://angular.io/api/common/DatePipe)