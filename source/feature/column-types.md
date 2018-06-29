---
title: Column Types
group: Features
order: 4
---

## Array

Array type is utilized by the q-grid to visualize primitive type collections. Here are some specific properties:

* Use `itemType` to setup array element type, could be used to populate correct input in the array editor.
* Use `itemFormat` to setup array element format string, could be used to build correct item presentation.
* Use `itemLabel` to setup a callback that returns a custom array element text.

{% docEditor "github/qgrid/ng2-example/tree/column-array-basic/latest" %}

> If list of complex objects need to be visualized, it's required to setup `itemLabel` property or rewrite cell templates, including edit template.

## Bool

Three state booleans are supported by the q-grid. Here are some specific properties:

* Use `trueValue` property to override the positive meaning.  
* Use `falseValue` property to override the negative meaning.
* Use `isIndeterminate` function to setup the undefined meaning.
* Use `isChecked`  function to setup boolean comparison.

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

{% docEditor "github/qgrid/ng2-example/tree/column-reference-basic/latest" %}

## Row indicator
## Row number

## Row options

{% docEditor "github/qgrid/ng2-example/tree/column-row-options-basic/latest" %}

## Text

{% docEditor "github/qgrid/ng2-example/tree/column-text-basic/latest" %}

## Time

{% docEditor "github/qgrid/ng2-example/tree/column-time-basic/latest" %}

## Url

To show url links with appropriate editors this column type could be used. Note if `label` property is not null, default editor could contain 2 input fields, respectively for the value and for the label.

{% docEditor "github/qgrid/ng2-example/tree/column-url-basic/latest" %}


## Suggested links

* [Angular currency pipe](https://angular.io/api/common/CurrencyPipe)
* [Angular decimal pipe](https://angular.io/api/common/DecimalPipe)
* [Angular date pipe](https://angular.io/api/common/DatePipe)