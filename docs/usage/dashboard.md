# Dashboard Operations

The dashboard at `dashboard.html` displays and filters leads.

- **Refresh**: Calls Supabase to re-fetch `leads`.
- **Filter**: By `status`, `source`, and free-text search.
- **Update status**: Buttons mark a lead as `qualified`, `contacted`, or `not_interested`.

Backend requirements:
- Supabase table `leads` with fields used in the UI (`name`, `email`, `phone`, `address`, `price`, `source`, `status`, `created_at`).