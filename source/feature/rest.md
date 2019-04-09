---
title: REST
group: Features
order: 16
---

Use REST plugin to connect q-grid with back-end. For sure back-end service should support query string that q-grid produces but again it's possible to change the output format by overriding `serialize` method in the q-grid model. 

```html
<q-grid>
   <q-grid-rest [url]="myServiceUrl" method="GET"></q-grid-rest>
</q-grid>
```

## GET Method Contract

By default if GET method is used q-grid produces next url for filtering, sorting and pagination.

`?filter=lastName=in:Doe,Jones;firstName=in:John,Harry&order=+firstName,-lastName&skip=100&take=50`

## POST Method Contract

By default if POST method is used q-grid produces next request body.

```javascript
{
    filter: 'lastName=in:Doe,Jones;firstName=in:John,Harry',
    order: '+firstName,-lastName',
    skip: 100,
    take: 50
}
```

## Custom Contract

The q-grid allows to override data contracts that are produced by REST plugin.

```typescript
@Component({
   selector: 'my-component',
   template: `
   <q-grid>
      <q-grid-rest url="qgrid.github.io" method="POST"></q-grid-rest>
   </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   ViewChild(GridComponent) myGrid: GridComponent;   

   ngAfterViewInit() {
      const { model } = this.myGrid;      
      model.rest({
        serialize: () => {
            const pagination = model.pagination();
            const sort = model.sort();
            const filter = model.filter();

            return {
               filter: filter.by,
               order: sort.by.map(s => {
                  const key = Object.keys(s)[0];
                  const value = s[key];
                  return (value === 'asc' ? '+' : '-') + key;
               }),
               skip: pagination.current * paginationState.size,
               take: pagination.size
            };      
      });
   }
}
```