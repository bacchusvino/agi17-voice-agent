# voiceAgent

Utilities for capturing and processing user voice input in the browser.

## Import

```js
import { voiceAgent } from './js/supabase.js'
```

## Methods

### initVoiceRecognition()
- **Description**: Initializes and returns a `SpeechRecognition` instance if supported, otherwise `null`.
- **Returns**: `SpeechRecognition | null`

Example:
```js
const recognition = voiceAgent.initVoiceRecognition()
if (!recognition) alert('Not supported')
```

### startVoiceCapture()
- **Description**: Starts a one-off recognition flow and resolves with final transcript.
- **Returns**: `Promise<string | null>`

Example:
```js
const transcript = await voiceAgent.startVoiceCapture()
console.log('Transcript:', transcript)
```

### processVoiceInput(transcript)
- **Description**: Extracts `email` and `phone` from a transcript and returns a partial lead object.
- **Params**: `transcript` (string)
- **Returns**: `{ name: string|null, email: string|null, phone: string|null, notes: string }`

Example:
```js
const leadData = await voiceAgent.processVoiceInput('My email is jane@example.com and phone 619-555-1212')
```
