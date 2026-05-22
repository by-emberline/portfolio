# 📸 Projects Media Replacement Guide

## Overview
Your portfolio now has **10 hotel/guesthouse projects** with placeholders ready for your images and videos. This guide shows exactly where and how to add your media.

---

## Project Structure

Each project has the following fields:
- **Project Name** (e.g., "Luxury Lakeside Resort")
- **Description** (short summary)
- **Hotel Name** (actual hotel/guesthouse name)
- **Location** (where it is)
- **Images Array** (3+ photos per project)
- **Video** (optional video URL)
- **Tech Stack** (technologies used)

---

## 10 Hotel Projects Ready for Media

### ✅ Project 1: Punyu International Holet
**Location:** Ondangwa, Namibia
**Hotel Name:** PUNYU INTERNATIONAL HOTEL

**Image URLs to replace:**
```
https://via.placeholder.com/800x600?text=Lake+Resort+Main
https://via.placeholder.com/800x600?text=Lake+Resort+Room
https://via.placeholder.com/800x600?text=Lake+Resort+Dining
```

**Video URL:**
```
https://via.placeholder.com/800x600?text=Lake+Resort+Video
```

---

### ✅ Project 2: Coastal Guest House
**Location:** Coastal Region, Portugal  
**Hotel Name:** Sunset Cove Guest House

**Image URLs to replace:**
```
https://via.placeholder.com/800x600?text=Coastal+Beach+View
https://via.placeholder.com/800x600?text=Coastal+Room
https://via.placeholder.com/800x600?text=Coastal+Dining
```

**Video URL:**
```
https://via.placeholder.com/800x600?text=Coastal+Video
```

---

### ✅ Project 3: Mountain Lodge
**Location:** Swiss Alps, Switzerland  
**Hotel Name:** Alpine Peak Lodge

**Image URLs to replace:**
```
https://via.placeholder.com/800x600?text=Mountain+Lodge+Peak
https://via.placeholder.com/800x600?text=Mountain+Lodge+Room
https://via.placeholder.com/800x600?text=Mountain+Lodge+Trails
```

**Video URL:**
```
https://via.placeholder.com/800x600?text=Mountain+Video
```

---

### ✅ Project 4: Urban Boutique Hotel
**Location:** Downtown, New York, USA  
**Hotel Name:** Metropolitan Boutique Hotel

**Image URLs to replace:**
```
https://via.placeholder.com/800x600?text=Urban+Hotel+Facade
https://via.placeholder.com/800x600?text=Urban+Hotel+Lobby
https://via.placeholder.com/800x600?text=Urban+Hotel+Rooftop
```

**Video URL:**
```
https://via.placeholder.com/800x600?text=Urban+Video
```

---

### ✅ Project 5: Safari Game Lodge
**Location:** Serengeti, Tanzania  
**Hotel Name:** Serengeti Safari Lodge

**Image URLs to replace:**
```
https://via.placeholder.com/800x600?text=Safari+Lodge+Exterior
https://via.placeholder.com/800x600?text=Safari+Lodge+Room
https://via.placeholder.com/800x600?text=Safari+Wildlife+View
```

**Video URL:**
```
https://via.placeholder.com/800x600?text=Safari+Video
```

---

### ✅ Project 6: Tropical Island Resort
**Location:** Maldives  
**Hotel Name:** Paradise Island Resort

**Image URLs to replace:**
```
https://via.placeholder.com/800x600?text=Island+Resort+Overview
https://via.placeholder.com/800x600?text=Island+Resort+Bungalow
https://via.placeholder.com/800x600?text=Island+Resort+Underwater
```

**Video URL:**
```
https://via.placeholder.com/800x600?text=Island+Video
```

---

### ✅ Project 7: Historic Manor Hotel
**Location:** Cotswolds, England  
**Hotel Name:** Ashford Manor Hotel

**Image URLs to replace:**
```
https://via.placeholder.com/800x600?text=Manor+Exterior+Historic
https://via.placeholder.com/800x600?text=Manor+Suite+Classic
https://via.placeholder.com/800x600?text=Manor+Gardens+Estate
```

**Video URL:**
```
https://via.placeholder.com/800x600?text=Manor+Video
```

---

### ✅ Project 8: Wine Country Inn
**Location:** Napa Valley, California, USA  
**Hotel Name:** Vineyards & Vine Inn

**Image URLs to replace:**
```
https://via.placeholder.com/800x600?text=Wine+Inn+Vineyard
https://via.placeholder.com/800x600?text=Wine+Inn+Room
https://via.placeholder.com/800x600?text=Wine+Inn+Cellar
```

**Video URL:**
```
https://via.placeholder.com/800x600?text=Wine+Video
```

---

### ✅ Project 9: Desert Oasis Resort
**Location:** Sahara, Morocco  
**Hotel Name:** Mirage Desert Resort

**Image URLs to replace:**
```
https://via.placeholder.com/800x600?text=Desert+Oasis+Sunset
https://via.placeholder.com/800x600?text=Desert+Oasis+Room
https://via.placeholder.com/800x600?text=Desert+Oasis+Starry
```

**Video URL:**
```
https://via.placeholder.com/800x600?text=Desert+Video
```

---

### ✅ Project 10: Nordic Wellness Retreat
**Location:** Swedish Lakeside, Sweden  
**Hotel Name:** Nordvika Wellness Retreat

**Image URLs to replace:**
```
https://via.placeholder.com/800x600?text=Nordic+Retreat+Exterior
https://via.placeholder.com/800x600?text=Nordic+Retreat+Sauna
https://via.placeholder.com/800x600?text=Nordic+Retreat+Spa
```

**Video URL:**
```
https://via.placeholder.com/800x600?text=Nordic+Video
```

---

## How to Replace Images & Videos

### Option 1: Use Image Hosting Service (Recommended)
Upload your images and videos to:
- **Cloudinary** (free tier: 25GB storage)
- **ImgBB** (free, no login required)
- **Imgur** (free)
- **GitHub** (free, up to 25MB per file)

Then replace the placeholder URLs with your hosted URLs.

### Option 2: Local Files (public folder)
1. Create a folder: `public/projects/`
2. Upload images there: `public/projects/project-1-image-1.jpg`
3. Reference them as: `/projects/project-1-image-1.jpg`

### Option 3: Update Code Directly

Open [src/pages/Home.tsx](src/pages/Home.tsx) and find the `projects` array (around line 424).

Replace placeholder URLs like this:

```typescript
// BEFORE (placeholder):
images: [
  "https://via.placeholder.com/800x600?text=Lake+Resort+Main",
  "https://via.placeholder.com/800x600?text=Lake+Resort+Room",
  "https://via.placeholder.com/800x600?text=Lake+Resort+Dining",
],
video: "https://via.placeholder.com/800x600?text=Lake+Resort+Video",

// AFTER (your real URLs):
images: [
  "https://your-image-hosting.com/lake-resort-main.jpg",
  "https://your-image-hosting.com/lake-resort-room.jpg",
  "https://your-image-hosting.com/lake-resort-dining.jpg",
],
video: "https://your-video-hosting.com/lake-resort-video.mp4",
```

---

## Features of the Modal

When users click "View Details" on a project card, they see:

✅ **Image Gallery**
- Large featured image (800x600px recommended)
- Left/Right navigation arrows
- Thumbnail indicators showing position (1 of 3 images)
- Click any thumbnail dot to jump to that image

✅ **Hotel Information**
- Project title
- Description
- Hotel/Guesthouse name
- Location

✅ **Video Section**
- Embedded video player (if video URL provided)
- Same 800x600px size for consistency

✅ **Full Details**
- Complete project description
- Tech stack badges
- Live Demo button
- GitHub repository link

---

## Image Recommendations

### Dimensions
- **Optimal:** 800x600px (16:9 aspect ratio)
- **Min:** 640x480px
- **Max:** 1200x900px

### Format
- **JPG:** Best for photos (smaller file size)
- **PNG:** For graphics/screenshots
- **WebP:** Best quality/size ratio (newer browsers)

### File Size
- Keep under 500KB per image for fast loading
- Compress using: TinyPNG, ImageOptim, or Squoosh

---

## Video Recommendations

### Format
- **MP4:** Most compatible (recommended)
- **WebM:** Smaller file size
- **Avoid:** .mov, .avi (not web-compatible)

### Length
- 10-30 seconds (people's attention span online)
- Keep file size under 5MB for fast loading

### Hosting
- **YouTube:** Embed link (no file hosting needed)
- **Vimeo:** Professional video platform
- **Cloudinary:** Optimizes video automatically
- **AWS S3/DigitalOcean:** Self-hosted option

### Example YouTube Embed
If using YouTube, format the URL as:
```
https://www.youtube.com/embed/VIDEO_ID
```

---

## Step-by-Step Example

Let's say you're adding images for the Luxury Lakeside Resort:

1. **Take your photos** of the lake, rooms, and dining area
2. **Upload to Cloudinary** (or your chosen service)
3. **Get the URLs** from the hosting service
4. **Open** [src/pages/Home.tsx](src/pages/Home.tsx)
5. **Find Project 1** (id: 1, "Luxury Lakeside Resort")
6. **Replace these lines:**
```typescript
images: [
  "https://cloudinary.com/your-lake-main.jpg",
  "https://cloudinary.com/your-lake-room.jpg",
  "https://cloudinary.com/your-lake-dining.jpg",
],
video: "https://cloudinary.com/your-lake-video.mp4",
```
7. **Save the file**
8. **Reload the page** - your images appear instantly!

---

## Testing

After updating an image URL:
1. Save [src/pages/Home.tsx](src/pages/Home.tsx)
2. Browser auto-refreshes (Vite hot reload)
3. Click "View Details" on the project
4. Verify your image appears in the gallery

---

## Troubleshooting

### Images Not Loading?
- ✅ Check URL is correct (copy from browser address bar)
- ✅ Verify image isn't blocked by CORS
- ✅ Try a different hosting service
- ✅ Check console for 404 errors

### Video Not Playing?
- ✅ Ensure video format is MP4 or WebM
- ✅ Check video URL is direct link (not page link)
- ✅ Verify video file size < 10MB
- ✅ Try YouTube embed format for simplicity

---

## Questions?

All 10 projects are now ready for your media! The structure is:
- Each project has 3 images by default (easily adjustable)
- Each project has 1 optional video
- Add/remove images simply by editing the arrays

Good luck with your portfolio! 🚀
