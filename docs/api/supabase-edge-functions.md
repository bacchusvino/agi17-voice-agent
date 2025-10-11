# Supabase Edge Functions

Edge Functions are Deno-based HTTP handlers deployed via Supabase. Both functions below require an `Authorization: Bearer <JWT>` header for a valid user.

## ingest-transcript (POST)
Path: `supabase/functions/ingest-transcript/index.ts`

### Request
- **Headers**: `Authorization: Bearer <JWT>`, `Content-Type: application/json`
- **Body**:
```json
{
  "content": "... transcript text ...",
  "role": "user" // optional, defaults to 'user'
}
```

### Response
- 200: `{ "success": true, "message": { ...row } }`
- 400: `{ "error": "..." }`

### Example (curl)
```bash
curl -X POST "$FUNCTION_URL" \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello from agent", "role":"user"}'
```

## login-sync (POST)
Path: `supabase/functions/login-sync/index.ts`

### Behavior
- Validates JWT and upserts a `profiles` row with `id`, `email`, `google_sub`, `updated_at`.

### Request
- **Headers**: `Authorization: Bearer <JWT>`
- **Body**: none

### Response
- 200: `{ "success": true, "user_id": "..." }`
- 400: `{ "error": "..." }`

### Example (curl)
```bash
curl -X POST "$FUNCTION_URL" \
  -H "Authorization: Bearer $JWT"
```
