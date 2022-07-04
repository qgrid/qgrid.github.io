---
title: File & Image
group: Column Types
order: 5
---
- [Image](#image)
- [Default template and specific properties](#default-template-and-specific-properties)

Use file column type for uploading and linking files.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="file" key="attachment">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-file-basic/latest" %}

<a name="image" href="#image">
   Image
</a>

Use this column type to display and upload images.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="image" key="avatar">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-image-basic/latest" %}

<a name="default-template-and-specific-properties" href="default-template-and-specific-properties">
   Default template and specific properties
</a>

* Use `[canUpload]` function to setup predicate if a file is suitable for the uploading.
* Use `[hasPreview]` function to override predicate indicating if the uploading file is an image and can be displayed under the `img` tag. 

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="image">
         <ng-template for="body" let-$cell>
            <img *ngIf="$cell.value" [src]="$cell.value" />
            <mat-icon *ngIf="!$cell.value" 
                      class="q-grid-icon">
                insert_photo
            </mat-icon>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```