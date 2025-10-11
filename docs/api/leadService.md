# leadService

High-level helper for CRUD-like operations on the `leads` table using Supabase from the browser.

## Import

```js
import { leadService } from './js/supabase.js'
```

## Methods

### createLead(leadData)
- **Description**: Inserts a new lead into `leads` table.
- **Params**: `leadData` (object) — expects name, email, and optional phone, source, status, notes
- **Returns**: `{ success: boolean, data?: object, error?: string }`

Example:
```js
const result = await leadService.createLead({
  name: 'Jane Agent',
  email: 'jane@example.com',
  phone: '619-555-1212',
  source: 'landing_page',
  notes: 'Interested in listing' 
})
if (!result.success) console.error(result.error)
```

### getLeads()
- **Description**: Fetches all leads ordered by `created_at` desc.
- **Params**: none
- **Returns**: `{ success: boolean, data?: array, error?: string }`

Example:
```js
const { success, data, error } = await leadService.getLeads()
if (success) {
  console.log('Leads:', data)
}
```

### updateLeadStatus(leadId, status, notes?)
- **Description**: Updates `status` and optional `notes` for a given lead.
- **Params**:
  - `leadId` (string|uuid)
  - `status` (string: 'new' | 'contacted' | 'qualified' | 'not_interested')
  - `notes` (string | null)
- **Returns**: `{ success: boolean, data?: object, error?: string }`

Example:
```js
await leadService.updateLeadStatus('uuid-here', 'qualified', 'Strong intent')
```
