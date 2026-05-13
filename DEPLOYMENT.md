# DEPLOYMENT GUIDE

How to get your Food Closet map live on the internet so everyone can use it.

---

## OPTION 1: GitHub Pages (Recommended - Completely Free)

### Step 1: Create a GitHub Account
1. Go to **github.com**
2. Click "Sign up"
3. Create a free account
4. Confirm your email

### Step 2: Create a Repository
1. Click "+" → "New repository"
2. Name: `foodcloset`
3. Description: "Community food resources map"
4. Select "Public"
5. Check "Add a README file"
6. Click "Create repository"

### Step 3: Upload Your Files
1. Click "Add file" → "Upload files"
2. Select all your files:
   - index.html
   - styles.css
   - app.js
   - data.js
   - README.md
   - QUICKSTART.md
   - DATA_COLLECTION.md
3. Commit changes

### Step 4: Enable GitHub Pages
1. Go to Settings (top right of repository)
2. Click "Pages" (left sidebar)
3. Under "Source" select "main branch"
4. Click "Save"
5. Wait 1-2 minutes
6. Your URL: `yourusername.github.io/foodcloset`

✅ **Your app is now live!**

---

## OPTION 2: Netlify (Very Easy - Also Free)

### Step 1: Go to Netlify
Visit **netlify.com**

### Step 2: Deploy
1. Click "Deploy manually"
2. Drag and drop your folder
3. Wait for upload to complete
4. Your URL will appear (something like `randomname-12345.netlify.app`)

✅ **Your app is live in seconds!**

### (Optional) Get a Custom Domain
1. Buy a domain (namecheap.com, godaddy.com, etc.)
2. In Netlify, go to Domain settings
3. Add your custom domain
4. Follow the DNS setup instructions

---

## OPTION 3: Your Own Web Server

If you have access to a web server through your organization:

1. Connect via FTP/SFTP using FileZilla
2. Upload all files to your `public_html` folder
3. Access at `yourdomain.com/foodcloset`

Ask your IT person for:
- Server address
- FTP login credentials
- Where to upload files

---

## OPTION 4: Google Sites (If Your Organization Uses Google)

Google Sites can host your map:

1. Go to **sites.google.com**
2. Create a new site
3. Add a new page
4. Click "More" → "Embed" → "Embed code"
5. Paste this code:
```html
<iframe src="https://your-deployed-app-url.com" width="100%" height="800" frameborder="0"></iframe>
```
6. Publish the site

---

## AFTER DEPLOYMENT

### Test Everything
- [ ] Check the map loads
- [ ] Markers appear
- [ ] Search works
- [ ] Filters work
- [ ] Detail popup shows
- [ ] Works on phone
- [ ] Links work

### Share Your Map
- [ ] Post link on your website
- [ ] Share on social media
- [ ] Give to partner organizations
- [ ] Include in newsletters
- [ ] Print QR code linking to map

### Generate a QR Code
1. Go to **qr-code-generator.com**
2. Paste your URL
3. Generate QR code
4. Print it on flyers and posters
5. People can scan with phones

---

## CUSTOM DOMAIN SETUP (Optional)

If you want `yourodomain.com` instead of `randomname.netlify.app`:

**GitHub Pages Custom Domain:**
1. Buy domain from namecheap.com, godaddy.com, etc.
2. In domain registrar settings, add these DNS records:
   - Type: A
   - Name: @
   - Value: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
3. In GitHub, go to Settings → Pages → Custom domain
4. Type your domain
5. Wait 24 hours for DNS to update

**Netlify Custom Domain:**
1. Buy domain
2. In Netlify dashboard → Domain management
3. Click "Add domain"
4. Follow the setup instructions
5. Update DNS records at your registrar

---

## KEEPING IT UPDATED

### When You Add New Locations:
1. Edit `data.js` locally
2. Commit to GitHub OR upload new version to Netlify
3. Changes appear within seconds to a few minutes

### Keep DNS/Hosting Information Safe
Save this information somewhere safe:
- GitHub username/password
- Domain registrar login
- Netlify login
- Admin email

---

## TROUBLESHOOTING DEPLOYMENT

**Q: Site says "404 Not Found"**
- Make sure you have `index.html` in the main folder
- Wait a few minutes for GitHub/Netlify to process

**Q: Map doesn't load**
- Check that you uploaded all files (js files are required)
- Verify internet connection
- Try in a different browser

**Q: Changes don't appear**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Wait 2-3 minutes for deployment

**Q: Can't connect to domain**
- DNS changes take 24-48 hours
- Check registrar settings are correct
- Try again later

---

## COSTS

### Option 1: GitHub Pages
- **Cost:** Free
- **Good for:** Technical users
- **Setup time:** 10 minutes

### Option 2: Netlify
- **Cost:** Free (with paid upgrades available)
- **Good for:** Beginners
- **Setup time:** 2 minutes

### Option 3: Custom Domain
- **Cost:** $8-12/year for domain
- **Cost:** Free if hosted on GitHub/Netlify
- **Worth it:** Yes! Much more professional

---

## NEXT STEPS

1. ✅ Choose a hosting option
2. ✅ Deploy your app
3. ✅ Test that everything works
4. ✅ Add real community data
5. ✅ Share the link with your community
6. ✅ Collect feedback

---

## GETTING HELP

- **GitHub Questions:** github.com/support
- **Netlify Help:** netlify.com/support
- **General Questions:** Ask your tech-savvy friend or local tech meetup

---

**Congratulations on going live! 🎉**
