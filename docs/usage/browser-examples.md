# Browser Usage Examples

## Create a lead
```html
<script type="module">
  import { leadService } from '/js/supabase.js'
  const result = await leadService.createLead({ name: 'Jane', email: 'jane@example.com' })
  console.log(result)
</script>
```

## Start voice capture
```html
<script type="module">
  import { voiceAgent } from '/js/supabase.js'
  const transcript = await voiceAgent.startVoiceCapture()
  console.log(transcript)
</script>
```

## Validate a form
```html
<script type="module">
  import { formHandler } from '/js/supabase.js'
  const { isValid, errors } = formHandler.validateForm({ name: 'Jane', email: 'jane@example.com' })
</script>
```
