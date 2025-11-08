# QualiFy System Test

## Quick 5-Minute Test

### Step 1: Start Local Server
```bash
cd /Users/joschapirtle/agi17-voice-agent
python3 -m http.server 8000
```

### Step 2: Test Landing Page
1. Open: http://localhost:8000/index.html
2. Fill out the form with test data:
   - Name: "Test User"
   - Email: "test@example.com"
3. Click "Join the Pilot"
4. You should see green success message: "Thanks! We'll reach out shortly."

### Step 3: Test Dashboard
1. Open: http://localhost:8000/dashboard.html
2. You should see:
   - Total Leads count (should be at least 1)
   - Your test lead in the table with name "Test User"
   - Status badge showing "New"

### Step 4: Test Filters
1. In dashboard, try the status filter (select "New")
2. Try searching for "Test" in search box
3. Both should show your test lead

### Step 5: Test Status Updates
1. Click the green checkmark ✓ button next to your test lead
2. Confirm the alert
3. Lead status should change to "Qualified"

---

## If Something Doesn't Work

### Landing Page Form Doesn't Submit
- Check browser console (F12 → Console tab)
- Look for any error messages
- Verify Supabase credentials are correct in index.html

### Dashboard Shows "Loading..." Forever
- Check browser console for errors
- Verify Supabase credentials in dashboard.html
- Check that the 'leads' table exists in Supabase

### No Data Shows in Dashboard
- Go to Supabase dashboard: https://supabase.com/dashboard/project/tyrwkeqavitwkffjcznj
- Click "Table Editor" → "leads"
- Manually verify if data was saved

---

## Success Criteria
✅ Form submission works  
✅ Success message appears  
✅ Dashboard loads  
✅ Test lead appears in table  
✅ Filters work  
✅ Status update works  

If all 6 checks pass, your system is fully operational! 🎉
