---
title: Filtering
group: Features
order: 10
---

There are situations when the end user need to show additional information for the rows in the q-grid. Row details serves to satisfy this necessary.

## Setup

Use q-grid model to setup filter options.

```javascript
gridModel.filter({
   by: {
      myTextColumn: { items: ['foo', 'bar'] },
      myCurrencyColumn: { blanks: true },
      myNumberColumn: { 
         expression: {
            kind: 'group',
            op: 'and',
            left: {
               kind: 'condition',
               left: key,
               op: 'in',
               right: ['foo', 'bar']
            },
            right: null
         }
      }
   }
});
```

## Column filters

## Custom filters

## Filter expressions

```javascript
gridModel.filter({
   by: {
      $expression: { 
         kind: 'group',
            op: 'and',
            left: {
               kind: 'condition',
               left: key,
               op: 'in',
               right: ['foo', 'bar']
         },
         right: null
      }
   }
});
```


## Suggested links

* [Standalone expression builder](https://github.com/qgrid/ng2-expression-builder)