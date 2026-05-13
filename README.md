# 🥗 Food Closet - Community Resources Map

A web-based map application to help your community find free food boxes, meals, and soup kitchens.

## Features

✅ **Interactive Map** - See all food resources on an easy-to-use map
✅ **Search Functionality** - Find resources by name or address
✅ **Filter by Type** - Show only food boxes, meals, or soup kitchens
✅ **Resource Details** - Hours, phone numbers, and directions
✅ **Mobile Friendly** - Works on phones, tablets, and computers
✅ **Easy to Update** - Add new locations by editing one file

---

## Quick Start

### Option 1: Open Locally (Easiest for Testing)

1. Download all files to your computer
2. Double-click `index.html` to open in your browser
3. You should see the map with sample locations

### Option 2: Deploy to the Internet (Free Options)

**GitHub Pages (Recommended)**
1. Create a free account at github.com
2. Create a new repository called `foodcloset`
3. Upload all files to the repository
4. Go to Settings → Pages → Select "main branch"
5. Your site will be live at `yourusername.github.io/foodcloset`

**Netlify (Also Free)**
1. Go to netlify.com
2. Click "Deploy manually"
3. Drag and drop your folder
4. Your site will be live instantly

---

## Admin Panel (Password Protected)

The app includes an admin panel to prevent unauthorized changes:

### Admin Login
1. Click **🔒 Admin Login** in the sidebar
2. Enter password: `admin123` (change this in the code)
3. Click **Login**

### Admin Features
- **Add Resources**: Click "+ Add Resource" to add new locations
- **Edit Resources**: Click "Edit" on any resource to modify it
- **Delete Resources**: Click "Delete" to remove resources
- **Logout**: Click "Logout" to exit admin mode

### Changing the Admin Password
In `app.js`, find this line:
```javascript
if (password === 'admin123') {
```
Replace `'admin123'` with your desired password.

### Security Notes
- Password is stored in browser localStorage (not secure for production)
- For production use, consider server-side authentication
- Admin status persists until logout or browser data is cleared

---

## Customizing Your App

### Change the Map Center
In **app.js**, find this line:
```javascript
this.mapCenter = [40.7128, -74.0060];
```
Replace with your city's coordinates.

### Change Colors and Styling
Open **styles.css** to customize:
- Colors: Search for `#2ecc71` (green), `#27ae60` (dark green), etc.
- Font sizes, spacing, and layout

### Change the Title
In **index.html**, find:
```html
<h1>🥗 Food Closet</h1>
<p>Find free meals and food boxes near you</p>
```
Update the text and emoji to match your organization's name.

---

## Resource Types Explained

The app supports 3 types of resources:

| Type | Icon | Use For |
|------|------|---------|
| **food-box** | 📦 | Food boxes, pantries, free groceries |
| **meal-site** | 🍽️ | Places that serve hot meals |
| **soup-kitchen** | 🍲 | Soup kitchens and bread programs |

You can add more types by editing the `resourceTypes` object in **data.js**.

---

## Data Format Reference

Each resource needs these fields:

| Field | Required | Example |
|-------|----------|---------|
| `id` | Yes | 1, 2, 3 (unique number) |
| `name` | Yes | "Downtown Food Pantry" |
| `type` | Yes | "food-box" |
| `address` | Yes | "123 Main St" |
| `phone` | Yes | "(555) 123-4567" |
| `latitude` | Yes | 40.7128 |
| `longitude` | Yes | -74.0060 |
| `hours` | Yes | "Mon-Fri: 9 AM - 5 PM" |
| `description` | Yes | "Free groceries available" |
| `notes` | Yes | "No registration required" |

---

## Collecting Data from Your Community

Here's how to gather location information:

1. **Call Local Organizations**
   - Food banks
   - Churches and community centers
   - Hospitals and clinics
   - Government agencies (SNAP, HUD)

2. **Questions to Ask**
   - What services do you provide?
   - What are your hours?
   - What's your exact address?
   - Phone number for inquiries?
   - Any special requirements?

3. **Online Resources**
   - Your city/county health department
   - 211.org (Dial 2-1-1 for help)
   - Local food bank websites
   - Community nonprofit websites

4. **Keep It Updated**
   - Email addresses to receive updates
   - Set a reminder to verify info quarterly
   - Ask for feedback from users

---

## Files Explained

```
foodcloset/
├── index.html      Main page - don't need to edit
├── styles.css      Colors and styling
├── app.js          How the app works
├── data.js         Your food locations ← EDIT THIS
├── LICENSE         Legal info
└── README.md       This file
```

---

## Troubleshooting

**Q: Map doesn't show**
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Check that all files are in the same folder

**Q: Locations don't appear**
- Check that latitude/longitude are correct
- Make sure the `type` exactly matches: `food-box`, `meal-site`, or `soup-kitchen`
- Open browser Developer Tools (F12) to check for errors

**Q: How do I add more resource types?**
- Edit `resourceTypes` in data.js
- Add new type option to the HTML filter section in index.html

---

## Next Steps (Building Toward Mobile)

Once your web version is live, you can:

1. **Add a Backend** - Store data in a database instead of a file
2. **Admin Panel** - Let authorized users add/edit locations online
3. **Mobile App** - Convert to React Native or Flutter for iOS/Android
4. **User Submissions** - Let community members suggest new locations
5. **Feedback** - Collect ratings and reviews

---

## Support & Questions

- Check if your file names are exactly correct (case-sensitive)
- Make sure you saved your changes
- Try refreshing the browser (Ctrl+R or Cmd+R)
- Clear browser cache if changes don't appear

---

## License

This project is open source and free to use for non-profit organizations.

---

## Contributing

Have improvements? Contact your development team or submit feedback!

**Thank you for helping your community! 🙏**
