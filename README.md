# Digital Bibash Consultation Landing Page

A mobile-first Next.js 14 landing page and thank-you flow for a free one-to-one digital marketing consultation. Form submissions are validated in the browser and on the server, then saved to Google Sheets through a Google Apps Script web app.

## Local setup

1. Install Node.js 18.17 or newer.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local`.
4. Add the environment variables described below.
5. Start the local development server:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`.

## Environment variables

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-deployment-id/exec
NEXT_PUBLIC_VIMEO_URL=https://vimeo.com/your-video-id
NEXT_PUBLIC_WHATSAPP_NUMBER=9779800000000
```

- `GOOGLE_SCRIPT_URL`: the Google Apps Script Web App URL. It stays server-side and is never sent to the browser.
- `NEXT_PUBLIC_VIMEO_URL`: a standard Vimeo or `player.vimeo.com` URL. Leave it empty to show the neutral video placeholder.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: digits only, including country code. Leave it empty to hide the WhatsApp button.

## Connect the form to Google Sheets

1. Create a Google Sheet.
2. Add this header row in row 1, in this exact order:

   ```text
   Timestamp | Full Name | Email | WhatsApp | Business Name | Website/Facebook | Message | Source
   ```

3. In the Sheet, open **Extensions > Apps Script**.
4. Delete the starter code and paste the complete contents of `docs/google-apps-script.gs`.
5. Save the Apps Script project.
6. Select **Deploy > New deployment**.
7. Choose **Web app** as the deployment type.
8. Set **Execute as** to **Me**.
9. Set **Who has access** to **Anyone**.
10. Deploy and authorize the script when Google prompts you.
11. Copy the Web App URL ending in `/exec` into `GOOGLE_SCRIPT_URL` in `.env.local`.
12. Restart the local development server after changing environment variables.

### Test a sample submission

1. Open the landing page locally.
2. Fill in all required fields with sample data.
3. Submit the form.
4. Confirm that the new row appears in the Google Sheet.
5. Confirm that the browser redirects to `/thank-you` only after the row is saved.

If submission fails, confirm the deployment access is set to **Anyone**, the Web App URL ends in `/exec`, and the latest Apps Script version is deployed.

## Build and lint

```bash
npm run build
npm run lint
```

## Deploy to Vercel

1. Push this project to a Git repository.
2. Import the repository in Vercel.
3. Keep the detected framework preset as **Next.js**.
4. In **Project Settings > Environment Variables**, add:
   - `GOOGLE_SCRIPT_URL`
   - `NEXT_PUBLIC_VIMEO_URL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
5. Add the values for Production, Preview, and Development as appropriate.
6. Deploy the project.
7. Submit one test lead on the deployed site and confirm it reaches the Google Sheet.

## Logo

The page reads the header and social image from `public/logo.png`. Replace that file with the official Digital Bibash logo while keeping the same filename. The image is rendered with its natural aspect ratio and will not be stretched.
