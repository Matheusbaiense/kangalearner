import { APP_URL } from "@/lib/resend";

export function newsletterConfirmHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're subscribed to KangaLearner tips</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#071A2C;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#F5A623;font-size:24px;font-weight:700;letter-spacing:-0.5px;">KangaLearner</h1>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">Western Australia Learner Test Practice</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 16px;color:#071A2C;font-size:20px;font-weight:700;">You're in! 🎉</h2>
              <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
                Thanks for subscribing to KangaLearner tips. You'll receive weekly WA driving tips and study reminders in English, Portuguese, or Spanish.
              </p>
              <p style="margin:0 0 24px;color:#334155;font-size:15px;line-height:1.6;">
                While you wait, why not start studying?
              </p>
              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                <tr>
                  <td style="border-radius:8px;background-color:#F5A623;">
                    <a href="${APP_URL}/learn" style="display:inline-block;padding:14px 28px;color:#071A2C;font-weight:700;font-size:15px;text-decoration:none;border-radius:8px;">Start Studying Free →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
                The KangaLearner Team
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                <a href="${APP_URL}" style="color:#94a3b8;text-decoration:none;">kangalearner.com.au</a>
                &nbsp;·&nbsp;
                <a href="${APP_URL}/privacy" style="color:#94a3b8;text-decoration:none;">Privacy Policy</a>
                &nbsp;·&nbsp;
                You received this because you subscribed at kangalearner.com.au
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function newsletterConfirmSubject(): string {
  return "You're subscribed to KangaLearner tips 🦘";
}
