---
title: Mouse API
group: Reference
order: 10
---

Use mouse API to handle user clicks in q-grid.

```typescript
@Component({
   template: `
   <q-grid [rows]="rows"></q-grid>
   `
})
export class MyComponent implements AfterViewInit {
    @ViewChild(GridComponent) myGrid: GridComponent;

    ngAfterViewInit() {
        const { model } = this.myGrid;

        model.mouseChanged.on(e => {
            const { code, status, target } = e.state;
            if (code === 'left' && status === 'up') {
                console.log(target);
            }
        });
   }
}
```