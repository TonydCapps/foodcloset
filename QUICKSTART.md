# GETTING STARTED GUIDE

This file will help you get your Food Closet app running quickly.

## What You Just Got

A complete web-based map application with:
- ✅ Interactive map showing food resources
- ✅ Search and filter capabilities
- ✅ Mobile-friendly design
- ✅ 5 sample locations (ready to replace with yours)
- ✅ Free hosting options

## Files In This Folder

1. **index.html** - The main page (don't edit unless you know HTML)
2. **styles.css** - Colors and design (safe to edit)
3. **app.js** - How the app works (don't edit unless you know JavaScript)
4. **data.js** - YOUR FOOD LOCATIONS (👈 EDIT THIS ONE)
5. **README.md** - Full documentation
6. **QUICKSTART.md** - This file

## 3-Step Setup

### STEP 1: Test It Locally
1. Find `index.html` in your file explorer
2. Right-click → "Open with" → Chrome/Firefox/Edge
3. You should see a map with 5 sample locations

### STEP 2: Replace Sample Data with Your Data
1. Open `data.js` with a text editor (Notepad, VS Code, etc.)
2. Replace the 5 sample locations with YOUR actual food resources
3. Follow the format exactly
4. Save the file
5. Refresh your browser - your locations will appear!

### STEP 3: Share It Online (Optional)
- **GitHub Pages** (Free): Upload to GitHub, enable Pages in settings
- **Netlify** (Free): Drag and drop your folder at netlify.com
- **Your Own Server**: Upload files to your web hosting

## Adding Your First Location

### Find Coordinates:
1. Google Maps → Search the address
2. Look at the URL: `@LATITUDE,LONGITUDE`
3. Copy those numbers

### Edit data.js:
Find this part:
```javascript
const resources = [
    {
        id: 1,
        name: "Downtown Community Food Box",
        ...
    }
]
```

Add a new location entry with your information.

## Admin Panel

### Login as Admin
1. Click **🔒 Admin Login** in the sidebar
2. Enter password: `admin123`
3. Now you can add, edit, and delete resources

### Change the Password
In `app.js`, find and change:
```javascript
if (password === 'admin123') {
```
Replace `'admin123'` with your password.

### Admin Features
- **Add**: Click "+ Add Resource"
- **Edit**: Click "Edit" on any resource
- **Delete**: Click "Delete" to remove
- **Logout**: Click "Logout" when done

## Quick Reference: Location Template

Copy-paste this into `data.js`:

```javascript
{
    id: 1,
    name: "Your Organization Name",
    type: "food-box",  // or "meal-site" or "soup-kitchen"
    address: "Street Address",
    phone: "(555) 555-5555",
    latitude: 40.7128,  // Google Maps
    longitude: -74.0060,  // Google Maps
    hours: "Hours of operation",
    description: "What you provide",
    notes: "Any special info"
}
```

## Resource Types

- `"food-box"` → 📦 Food boxes, pantries
- `"meal-site"` → 🍽️ Hot meals
- `"soup-kitchen"` → 🍲 Soup & bread

## Common Questions

**Q: How do I find coordinates?**
A: Google Maps URL has `@40.7128,-74.0060` - those are your numbers!

**Q: Can I change the colors?**
A: Yes! Edit `styles.css` and look for `#2ecc71` (green) and `#27ae60` (dark green)

**Q: How many locations can I add?**
A: As many as you want!

**Q: Can I add new types (like "shelter", "health-clinic")?**
A: Yes! Follow the instructions in README.md section "Resource Types"

**Q: What if I mess up the data format?**
A: Look at the example entries carefully - follow the exact same format. Check the README if you get stuck.

## Need Help?

1. Check the **README.md** file - it has complete documentation
2. Make sure your JSON syntax is correct (commas, brackets, quotes)
3. Verify coordinates are from Google Maps
4. Clear browser cache and refresh

## Next Steps After Setup

- [ ] Add all your local food resource locations
- [ ] Test on mobile phone
- [ ] Get feedback from community
- [ ] Deploy online (GitHub Pages or Netlify)
- [ ] Share with community partners
- [ ] Update quarterly

---

**Good luck! You're building something that will really help your community! 🌟**
