---
title: Date Time
group: Column Types
order: 4
---
- [Time](#time)
- [Default template and specific properties](#default-template-and-specific-properties)
- [Date as String](#date-as-string)
- [Suggested Links](#suggested-links)

Use this column type to display date or date times.

```typescript
qgrid
   .model()
   .data({
      columns: [
         { key: 'birthday', type: 'date' }
      ]
   });
```

<a name="time" href="#time">
   Time
</a>

Use number type to display time values in a specific format.

```typescript
qgrid
   .model()
   .data({
      columns: [
         { key: 'alarm', type: 'time' }
      ]
   });
```

<a name="default-template-and-specific-properties" href="#default-template-and-specific-properties">
   Default template and specific properties
</a>

* Use `qGridDate` directive to display a date according to the locale rules.

```html
<q-grid>
   <ng-template qGridColumnBody="birthday" let-$cell>
      {{$cell.label | qGridDate: $cell.column.format}}
   </ng-template>
</q-grid>
```

<a name="date-as-string" href="#date-as-string">
   Date as String
</a>

Usually data from http request goes directly to the q-grid, in this case if column is marked or generated as date only ISO 8601 format is supported.

* `YYYY-MM-DD` - 2017-08-10
* `YYYY-MM-DDTHH:mm` - 2017-08-10T15:20
* `YYYY-MM-DDTHH:mm` - 2017-08-10T15:20:23
* `YYYY-MM-DDTHH:mm` - 2017-08-10T15:20:23.738Z

If it's not possible to lead data contract to ISO 8601 and there is no chance to to convert string to date object before putting it to q-grid column `value` property can be overridden.

```typescript
qgrid
   .model()
   .data({
      columns: [
         { key: 'birthday', type: 'date', value: row => new Date(row.birthdayString) }
      ]
   });
```

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Angular date pipe](https://angular.io/api/common/DatePipe)
* [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)