---
title: Keyboard API
group: Reference
order: 9
---

Use keyboard API to handle key presses when q-grid is in focus.

```typescript
@Component({
   template: `
    <q-grid></q-grid>
   `
})
export class MyComponent implements AfterViewInit {
    @ViewChild(GridComponent) myGrid: GridComponent;

    ngAfterViewInit() {
        const { model } = this.myGrid;

        model.keyboardChanged.on(e => {
            const { codes, status } = e.state;
            if (status === 'down') {
                console.log(codes);
            }
        });
   }
}
```