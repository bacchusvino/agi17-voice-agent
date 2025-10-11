# config (config.example.js)

Configuration reference for environment-driven settings.

> Copy `config.example.js` to `config.js` and edit values.

## supabase
- **url**: Project URL (`SUPABASE_URL`)
- **anonKey**: Public anon key (`SUPABASE_ANON_KEY`)
- **serviceRoleKey**: Service role key (`SUPABASE_SERVICE_ROLE_KEY`)

## voiceAgent
- **enabled**: Enable voice agent features (boolean)
- **language**: Recognition language, e.g. `en-US`
- **continuous**: Continuous recognition (boolean)
- **interimResults**: Interim results (boolean)

## app
- **name**: App name
- **version**: Semantic version
- **environment**: `development|production|...`
- **port**: Local dev port

## leads
- **defaultSource**: Default `source` for incoming leads
- **defaultStatus**: Default `status` for new leads
- **autoFollowUp**: Enable auto follow-up
- **followUpDelay**: Delay in ms between follow-ups