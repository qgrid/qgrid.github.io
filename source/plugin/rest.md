---
title: REST
group: Plugins
order: 6
---
- [Installation](#installation)
- [POST Method](#POST-method)
- [GET Method](#GET-method)
- [How to make a custom contract?](#how-to-make-a-custom-contract)
   
Use REST plugin to connect q-grid with back-end directly.

<a name="installation" href="#installation">
   Installation
</a>

Add angular component inside of q-grid component, after that q-grid will start using sorting, filtering and pagination from the rest service.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid>
         <q-grid-rest [url]="myServiceUrl" method="GET"></q-grid-rest>
      </q-grid>
   `
})
export class MyComponent {
   myServiceUrl = 'http://localhost:4000/exampleData'
}
```

<a name="POST-method" href="#POST-method">
   POST Method
</a>

Next body is produced for filtering, sorting and pagination.

```javascript
{
    filter: 'lastName=in:Doe,Jones;firstName=in:John,Harry',
    order: '+firstName,-lastName',
    skip: 100,
    take: 50
}
```

<a name="GET-method" href="#GET-method">
   GET Method
</a>

Next url is produced for filtering, sorting and pagination.

`?filter=lastName=in:Doe,Jones;firstName=in:John,Harry&order=+firstName,-lastName&skip=100&take=50`

<a name="how-to-make-a-custom-contract" href="#how-to-make-a-custom-contract">
   How to make a custom contract?
</a>

Override `serialize` method to change request output.

```typescript
@Component({
   selector: 'my-component',
   template: `
     <q-grid [model]="gridModel">
       <q-grid-rest [url]="myServiceUrl" method="POST"></q-grid-rest>
     </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   gridModel = this.qgrid.model();
   myServiceUrl = 'http://localhost:4000/exampleData'

   constructor(private qgrid: Grid) {}

   ngAfterViewInit() {
      this.gridModel.rest({
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

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [How to propagate list of items to the column filter from the server?](/feature/filtering.html#How-to-propagate-list-of-items-to-the-column-filter-from-the-server)
