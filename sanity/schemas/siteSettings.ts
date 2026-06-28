export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'heroImage', title: 'Home Page Hero Image', type: 'image', options: { hotspot: true }, description: 'Full-screen background image for the homepage hero section. Recommended: 1920x1080 or larger.' },
    { name: 'heroVideo', title: 'Home Page Hero Video URL', type: 'url', description: 'Optional: YouTube or MP4 video URL for the hero background.' },
    { name: 'logo', title: 'Site Logo', type: 'image', options: { hotspot: true } },
    { name: 'logoWhite', title: 'Site Logo (White/Light version)', type: 'image', options: { hotspot: true }, description: 'For use on dark backgrounds like the hero section.' },
    { name: 'factoryImage', title: 'Factory / Workshop Image', type: 'image', options: { hotspot: true }, description: 'Photo of your factory or manufacturing facility. Shown on the homepage "We build it" section.' },
  ],
}
