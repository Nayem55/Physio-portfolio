import type { GlobalConfig } from 'payload'

/** Image source preferences shown in the dashboard Settings area. */
export const MediaSettings: GlobalConfig = {
  slug: 'media-settings',
  label: 'Image & Cloudinary',
  admin: {
    group: 'Settings',
    description: 'Optional Cloudinary details and guidance for using public image links in website content.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Cloudinary',
          fields: [
            { name: 'cloudName', type: 'text', label: 'Cloud name' },
            {
              name: 'uploadPreset',
              type: 'text',
              label: 'Unsigned upload preset',
              admin: { description: 'Use an unsigned preset if you later connect a browser-side Cloudinary uploader.' },
            },
            { name: 'folder', type: 'text', label: 'Default folder', defaultValue: 'physio-portfolio' },
          ],
        },
      ],
    },
  ],
}
