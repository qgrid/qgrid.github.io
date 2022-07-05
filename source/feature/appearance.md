---
title: Appearance
group: Features
order: 8
---

- [How to apply styles to the particular cell or row?](#how-to-apply-styles-to-the-particular-cell-or-row)
- [How to change column width?](#how-to-change-column-width)
- [How to make column width auto adjusted to the cell content?](#how-to-make-column-width-auto-adjusted-to-the-cell-content)
- [Suggested Links](#suggested-links)

Using standard css selection is the easiest option to apply some styles, almost any q-grid element is reachable by convenient class name. For instance you can use `q-grid-{column.type}` to select cells base on column type and `q-grid-the-{column.key}` to select cells based on column key.

<a name="how-to-apply-styles-to-the-particular-cell-or-row" href="#how-to-apply-styles-to-the-particular-cell-or-row">
   How to apply styles to the particular cell or row?
</a>

There are style callbacks in q-grid model to define css classes to the appropriate cells or rows.

```typescript
qgrid
   model()
   .style({
      cell: {
         birthday: (row, column, context) => {
            // as a result td.hey-bob or td.hey-bill
            context.class(`hey-${row.name}`, {
               color: `#${row.color}`,
               background: '#3f51b5'
            });
         }
      },
      row: (row, context) => {
         if (row.isActive) {
            context.class('active');
         }
      }
   }):
```

> Please note, that `row` callback as a row can receive `RowDetails` or `Node` depending on settings.

{% docEditor "github/qgrid/ng2-example/tree/style-cell-basic/latest" %}

<a name="how-to-change-column-width" href="#how-to-change-column-width">
   How to change column width?
</a>

Use css styles or column `width` property to setup desired column size using pixels or percentages. To better control layout when percents are used you should consider to explicitly define widths for every colum.

```typescript
qgrid
   .model();
   .data({
      columns: [
         { key: 'name', type: 'text', width: 100 },
         { key: 'age', type: 'number', width: '100%', widthMode: 'relative' },
         { key: 'birthday', type: 'date', widthMode: 'fit-head' }
      ]
   });
```

<a name="how-to-make-column-width-auto-adjusted-to-the-cell-content" href="#how-to-make-column-width-auto-adjusted-to-the-cell-content">
   How to make column width auto adjusted to the cell content?
</a>

Now q-grid doesn't support column auto size, you can try to use style callback to do it on your side.

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Style API](/reference/style-api.html)
