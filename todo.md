# Data Table:
1. the table should expect the table row to be nothing but an `id` field and a map string => string of other fields
1. for each row it should loop again through the table headers but instead of showing the header.text it will show row\[header.field\]
1. the table will emit a view event whose value will be the row clicked
1. the table will also emit a hover event whose value is the the row hovered
1. the table will accept a prop called `actions` which is an array of {icon, color, key, text}
1. the table will emit an action event whose value is the action key and the row clicked
1. the table will emit a `showActions` event whose value is the row clicked
1. the table header will have a 'type' field who can take one of these supported values \['text', 'markableText', 'number', 'img', 'avatar', 'date', 'dateTime', 'status', 'entity', 'geolocation', 'ipAddress'\]
1. each supported value will correspond to a different component for rendering what is inside the (td) element
1. the tableHeader with type 'status' shall have a new field called 'statuses' that is an array of {icon, color, key, text}
1. the tableHeader with type 'entity' shall have a new field called 'value', this is the key of the entity the table will show
1. also the tableHeader can now also have a new field called 'filterable'
1. the filter component will be a list of applicable filters; text header will have exact filters while date, dateTime, ipAddress & number fields will have a range filter and the status & entity headers will have a special filter.
1. the filter for geolocation will consist of a geolaction input and a radius input.
1. there shall also be a new v-model now that is an array of filters.
1. the special filter of status will be a list of checkboxes, each checkbox will have a value of the status key and a text of the status text.
1. however the special filter of the entity should make use of a composable of the entity to fetch the list of entities and show them in a list of checkboxes.
1. write a custom computed property that will return a URL for the searching, sorting and filtering.
1. write a function at the backend that will accept the searching, sorting and filtering and builds a query out of them.

# Generic Form:
1. the form will accept a prop called `fields` which is an array of {key, type, label, value, required, disabled, options, placeholder, helpText, validation}
1. you can v-model the form to get the form data
1. the form will emit a `submit` event whose value is the form data
1. the form will emit a `reset` event whose value is the form data
1. the form will emit a `cancel` event whose value is the form data
1. the form will take a prop called `loading` which will disable the submit button and show a loading spinner
1. the form will take a prop called `submitText` which will be the text of the submit button
1. the form will take a prop called `cancelText` which will be the text of the cancel button
1. the form will take a prop called `resetText` which will be the text of the reset button
1. some inputs might depend on other inputs, for example if you have a select input that has a value of 'other' then you might want to show a text input to enter the other value, this can be done by adding a `dependsOn` field to the input object, this field will be an array of {key, value} objects, if the value of the key is equal to the value of the input then the input will be shown, otherwise it will be hidden.
1. the form will take a prop called `errors` which will be an object of {key, value} where the key is the key of the input and the value is the error message
1. the form will take a prop called `success` which will be a boolean, if true then the form will show a success message
1. the form will take a prop called `successMessage` which will be the success message
1. the form might be a mutistep form, in this case you can use the `step` prop to specify the current step, the `steps` prop to specify the steps and the `next` and `previous` events to move between steps.
1. the form will take a prop called `steps` which will be an array of {key, label, fields} objects, the key will be the key of the step, the label will be the label of the step and the fields will be the fields of the step
1. the form will take a prop called `step` which will be the key of the current step
1. the form will emit a `next` event whose value is the key of the next step
1. the form will emit a `previous` event whose value is the key of the previous step
1. the form will take a prop called `stepText` which will be the text of the step button
1. the form will take a prop called `nextText` which will be the text of the next button
1. the form will take a prop called `previousText` which will be the text of the previous button
1. the form will take a prop called `finishText` which will be the text of the finish button

# Generic Input:
1. the input will accept a prop called `type` which will be one of the supported types \['text', 'number', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'date', 'dateTime', 'time', 'geolocation', 'ipAddress', 'password', 'email', 'url', 'file', 'image', 'video', 'audio', 'color', 'entity', 'status', 'markableText', 'avatar', 'hidden'\]
1. the input will accept a prop called `label` which will be the label of the input
1. the input will accept a prop called `value` which will be the value of the input
1. the input will accept a prop called `required` which will be a boolean, if true then the input will be required
1. the input will accept a prop called `disabled` which will be a boolean, if true then the input will be disabled
1. the input will accept a prop called `options` which will be an array of {key, value} objects, this will be used for select, checkbox, radio and switch inputs
1. the input will accept a prop called `placeholder` which will be the placeholder of the input
1. the input will accept a prop called `helpText` which will be the help text of the input
1. the input will accept a prop called `validation` which will be an array of {type, message} objects, this will be used for text, number, textarea, date, dateTime, time, geolocation, ipAddress, password, email, url, file, image, video, audio, color, entity, status, markableText, avatar and hidden inputs
1. the input will accept a prop called `errors` which will be an array of {type, message} objects, this will be used for text, number, textarea, date, dateTime, time, geolocation, ipAddress, password, email, url, file, image, video, audio, color, entity, status, markableText, avatar and hidden inputs
1. the input will accept a prop called `success` which will be a boolean, if true then the input will show a success message
1. the input will accept a prop called `successMessage` which will be the success message
1. the input will accept a prop called `loading` which will be a boolean, if true then the input will show a loading spinner
