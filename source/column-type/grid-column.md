---
title: Grid Column
group: Column Types
order: 0
---

Represents the columns of the q-grid.

## Column Type

Column type is responsible for how the cell is drawn and how it behaves. Beside out of box column types it's possible to define own.  Note that some of supported column types are utilized for internal needs.

## Column Key

A column unique identifier, used to retrieve cell values if `path` or `value` properties are not setup for the column.

## Column Title

Column header text also could be used by plugins like column-filter.

## Column Description

Column header tooltip text, could be shown as column tooltip.

## Column Value & Label

The callback or some constant could be used to retrieve or setup the cell value/label.

```typescript
@Component({
    template: `
       <q-grid [rows]="rows">
          <q-grid-columns>
             <q-grid-column key="address" [value]="address">
          </q-grid-columns>
       </q-grid>
    `
})
export class MyComponent {
   address(row, value) {
      if (arguments.length > 1) {
         row.contact.address = value;
         return;
      }

      return row.contact.address;
   }
```

> Be aware that if there is a requirement to use `this` pointer inside the `value` or `label` callback, `this` should be passed by using closure or lambda function.

## Column Path & LabelPath

String path to the cell value or label. Note that `path` property has lower priority than the `value` property.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="primaryPhone" path="address.phones.0.num">
      </q-grid-column>
   </q-grid-columns>
</q-grid>

```

## Column Pin

Indicates if the q-grid column should be frozen on `left` or `right`.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="lastName" pin="left">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## Column Class

A functional type of the column. It's utilized by plugins and internal routines to filter out necessary columns. Right now next classes are used.

* data
* cohort
* markup
* pivot

## Column Editor & EditorOptions

Use editor type to shown predefined editor inside the not aligned type column.

* `trigger` says when cell should go to the edit mode.
* `cruise` defines navigation behavior when cell is in edit mode.
* `modelFactory` is used by reference column to draw a another q-grid in edit cell mode.
* `fetch` is used by `auto-complete` editor to populate list of items.
* `actions` is used by row-options column to draw menu with commands.

```html
<q-grid>
   <q-grid-columns>      
      <q-grid-column key="site"
                     type="url"
		               title="Edit on click"
                     [editorOptions]="{trigger: 'click'}">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## Column Width, MaxWidth & MinWidth

Indicates the column size which can be setup in `pixels` or `percents`. 

```html
<q-grid-column key="id" [maxWidth]="65"></q-grid-column>
<q-grid-column key="number" width="30%"></q-grid-column>
```
	
> Right now percents are materialized only once on view init, depending on the origin q-grid width. Future plans are to add additional modes to handle percents constantly.

## Column WidthMode

Controls the algorithm to materialize percents to pixels. 

* `relative` mode means to get whole q-grid width minus static widths columns than apply percents.
* `absolute` mode means to get whole q-grid width and apply percents.

## Column ViewWidth

If setup, the host column expands width to the viewWidth value on focus occurs.

## Column Indicators

Use `can-` and `is-` properties to control q-grid columns interaction behavior.

* `[canEdit]`
* `[canResize]`
* `[canSort]`
* `[canMove]`
* `[canFilter]`
* `[canHighlight]`
* `[canFocus]`
* `[isVisible]`

## Column Index 

Use index property to define the order of q-grid columns.
	 
## Column Compare

Setup this function to change order method that is used by `column sort pipe` to sort rows.

## Column Children

The q-grid header can utilize column hierarchy by using nested components or children property. Template below fills in the q-grid `columnList.index` property containing a node that represents header layout.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="parent">
         <q-grid-column key="child-1"></q-grid-column>
         <q-grid-column key="child-2"></q-grid-column>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## How to show tooltip in column header?

Use description property of the column.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="my-column" description="Will be shown in tooltip">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

