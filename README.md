# auramax-page

AuraMax landing page and web utilities.

## Password Reset Page

The `/reset-password` page handles Supabase password recovery flows in the browser.

### How It Works

1. User requests password reset in the iOS app
2. Supabase sends an email with a recovery link to `https://auramax.app/reset-password#access_token=...`
3. User opens the link in their browser (desktop or mobile)
4. The page validates the tokens and shows a password reset form
5. User sets a new password
6. User returns to the iOS app and signs in with the new password

### Supabase Dashboard Configuration

You must configure the following in your Supabase project dashboard:

#### 1. Auth → URL Configuration

- **Site URL**: `https://auramax.app`
- **Redirect URLs**: Add `https://auramax.app/reset-password`

#### 2. Auth → Email Templates (optional)

Customize the password recovery email template. The `{{ .ConfirmationURL }}` placeholder will automatically use the redirect URL.

### Environment Variables

The reset password page requires Supabase credentials. Update the following in `reset-password.html`:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

**Security Note**: The anon key is safe to expose client-side. Never expose the service role key.

For production, consider:
- Using a build system to inject environment variables
- Using a hosting platform's environment variable injection (Vercel, Netlify, etc.)

### iOS App Configuration

In your iOS app, when calling `resetPasswordForEmail`, set the `redirectTo` parameter:

```swift
try await supabase.auth.resetPasswordForEmail(
    email,
    redirectTo: URL(string: "https://auramax.app/reset-password")
)
```

### Features

- Clean, modern UI matching AuraMax design
- Password strength recommendations (8+ chars, uppercase, lowercase, number, symbol)
- Minimum 6 character requirement enforced
- Show/hide password toggle
- Proper error handling for expired/invalid links
- Mobile responsive
- Loading, error, form, and success states
- URL fragment cleared after reading tokens (security)
- Rate-limiting on submit (prevents double-clicks)