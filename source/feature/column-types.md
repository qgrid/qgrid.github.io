---
title: Column Types
group: Features
order: -1
---

## Array

Array type is utilized by the q-grid to show values of system array type. Usually primitive arrays are used. If collection of objects need to be visualized, it's required to setup `itemLabel` property. Here are some specific properties:

* `itemType` array element type, is used to populate correct input in the array editor.
* `itemFormat` array element format string that is used to build correct item presentation.
* `itemLabel` array element function that is used to return item presentation.

{% docEditor "github/qgrid/ng2-example/tree/column-array-basic/latest" %}

# Bool

Three state booleans are supported by the q-grid. Here are some specific properties:

* `trueValue`
* `falseValue`
* `isIndeterminate`
* `isChecked`

{% docEditor "github/qgrid/ng2-example/tree/column-bool-basic/latest" %}

# Currency & Number

Use currency and number types to show decimal values in a appropriate format. Here are some specific properties:

* `format`
* `symbol`
* `code`
* `maxLength`

{% docEditor "github/qgrid/ng2-example/tree/column-currency-basic/latest" %}

# Date

Use this column type to show date or date times. `format` property can be used to control textual representation.

{% docEditor "github/qgrid/ng2-example/tree/column-date-basic/latest" %}

# Email & Url

To show links with appropriate editors email or url column types can be used.

{% docEditor "github/qgrid/ng2-example/tree/column-email-basic/latest" %}

# Image & File

Use image or file column types to add possibility of uploading  links with appropriate editors email or url column types can be used.

* canUpload
* hasPreview

{% docEditor "github/qgrid/ng2-example/tree/column-image-basic/latest" %}

# Id

# Reference

{% docEditor "github/qgrid/ng2-example/tree/column-reference-basic/latest" %}

# Row indicator
# Row number

# Row options

{% docEditor "github/qgrid/ng2-example/tree/column-row-options-basic/latest" %}

# Text

{% docEditor "github/qgrid/ng2-example/tree/column-text-basic/latest" %}

# Time

{% docEditor "github/qgrid/ng2-example/tree/column-time-basic/latest" %}