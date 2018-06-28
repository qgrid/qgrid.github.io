---
title: Import
group: Features
order: 8
---

The Qgrid allows you to import data in different formats. 

```html
<q-grid-import></q-grid-import>
```

## Supported formats

File types which are supported for import into Qgrid
Make work import from xlsx by adding http://github.com/SheetJS/js-xlsx library

* `csv`
* `json`
* `xlsx`
* `xml`

{% docEditor "github/qgrid/ng2-example/tree/select-cell-basic/latest" %}

## Import options

Only for xlsx, csv

* `options`	takes options object

## Options object properties

* `head` takes one of three values : alpha, numeric or default. This option is applied to choose the type of title to import into the grid.
   * `alpha` - imported columns titles will be shown in alphanumeric format.
   * `numeric` - imported columns titles will be shown in numeric format.
   
   If header option isn't set or it's smth else - then first row of the imported document will be considered as column titles.
