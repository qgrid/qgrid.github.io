---
title: ColumnModel
type: api
group: API
order: 13
---
A class that represents any column in the q-grid.

{% docTable "source/api/column-model.json" %}

### Usage

``` javascript
gridModel.data({
   columns: [
   {
	     key: 'id',
	  	 title: 'ID',
		 type: 'id',
		 editor: 'number'
	  },
   {
	     key: 'avatar',
		 title: 'Avatar',
		 type: 'image',
		 width: 80,
		 value: (item, value) => isUndef(value) ? item.avatar : item.avatar = value,
		 labelPath: 'avatarFileName'
	  },
	  {
	     key: 'name.last',
		 title: 'Last Name',
		 type: 'text',
		 path: 'name.last'
	  },
	  {
	     key: 'gender',
		 title: 'Gender',
		 type: 'text',
		 value: (item, value) => isUndef(value) ? item.gender : item.gender = value,
		 editor: 'dropdown',
		 editorOptions: {
		    fetch: ['female', 'male']
		 }
	  },
	  {
	     key: 'birthday',
		 title: 'Birthday',
		 type: 'date'
	  },
	  {
	     key: 'comment',
		 title: 'Comment',
		 type: 'text',
		 editor: 'text-area',
		 width: 200,
		 maxLength: 8000
	  },
	  {
		 key: 'password',
		 title: 'Password',
		 type: 'password',
		 isDefault: false
	  },
	  {
	     key: 'teammates',
		 title: 'Teammates',
		 type: 'reference',
		 editorOptions: {
		    modelFactory: () => {
			   const model = qgrid.model();
			   model
               .selection({
			         mode: 'multiple',
				     unit: 'row'
			      })
				  .columnList({
				     generation: 'deep'
				  })
				  .data({
				     rows: ctrl.rows
				  });

			      return model;
			   }
			}
		},
		{
		   key: 'contact.address.zip',
		   title: 'Zip',
		   type: 'number',
		   path: 'contact.address.zip',
		   width: 70,
		   isDefault: false
		},
		{
		   key: 'contact.phone',
		   title: 'Contact Phones',
		   type: 'array',
		   path: 'contact.phone',
		   width: 250
		},
		{
		   key: 'contact.email.primary',
		   title: 'Primary Email',
        type: 'email'
     },
		{
			key: 'contact.email.secondary',
			title: 'Secondary Email',
			type: 'email',
			editor: 'autocomplete',
			editorOptions: {
               fetch: (item, d, search = '') =>
                   new Promise(resolve => resolve(['foo@bar.ru']))
			}
		},
		{
		   key: 'salary',
		   title: 'Salary',
		   type: 'currency'
		}
		{
		   key: 'modifiedTime',
		   title: 'Modified Time',
		   type: 'time'
		},
		{
		   key: 'webPage',
		   title: 'Web Page',
		   type: 'url'
		},
		{
		   key: 'attachment',
		   title: 'Attachment',
		   type: 'file'
		},
		{
		   key: 'isOnline',
		   title: 'Online',
	       type: 'bool'
		}]
});
```

### Suggested Links

* [value.js](https://github.com/qgrid/ng2/blob/master/core/services/value.js)
* [label.js](https://github.com/qgrid/ng2/blob/master/core/services/label.js)
* [column.pipe.js](https://github.com/qgrid/ng2/blob/master/core/pipe/column.pipe.js)

