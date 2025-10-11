# formHandler

Utilities for validating and showing messages for lead capture forms.

## Import

```js
import { formHandler } from './js/supabase.js'
```

## Methods

### validateForm(formData)
- **Description**: Validates basic fields (`name`, `email`).
- **Params**: `formData` (object)
- **Returns**: `{ isValid: boolean, errors: string[] }`

Example:
```js
const { isValid, errors } = formHandler.validateForm({ name: 'Jane', email: 'jane@example.com' })
```

### isValidEmail(email)
- **Description**: Email regex check.
- **Params**: `email` (string)
- **Returns**: `boolean`

### showMessage(message, type?)
- **Description**: Shows a temporary UI message in `#successMessage`; `type` can be 'success' or 'error'.
- **Params**: `message` (string), `type` ('success'|'error' = 'success')

Example:
```js
formHandler.showMessage('Saved!', 'success')
```
