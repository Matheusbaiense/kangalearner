# Store Privacy And Data Safety Declarations

Use this as a store-submission checklist for KangaLearner mobile. It is a working guide, not legal advice.

## Scope

The mobile app is for learner drivers, not children. It can be used as a guest app, with optional Supabase login/sync. The app now includes mobile advertising support through direct sponsors, Google Ad Manager, and AdMob.

## Apple App Store

In App Store Connect > App Privacy, review and declare:

- Contact Info: email address, collected only when the user creates/signs into an account, used for app functionality/account management.
- Usage Data: practice answers, mock test history, saved progress, and product interactions when sync is enabled.
- Identifiers: device/ad identifiers may be collected by Google Mobile Ads for advertising and measurement.

Tracking:

- If personalized ads or cross-app tracking are enabled, App Tracking Transparency must be requested and the App Privacy form must mark tracking accordingly.
- Current code includes `NSUserTrackingUsageDescription` through the ads config plugin. Before production iOS release, verify the runtime ATT prompt behavior in a real/dev build and keep non-personalized ads as the fallback when permission/consent is not granted.

## Google Play

In Google Play Console > App Content:

- Ads: mark "Yes, my app contains ads."
- Data Safety: declare data encrypted in transit.
- Account deletion: provide the deletion/support path that matches the live account-deletion flow.

Data types to review:

- Personal info: email address for optional account/sync.
- App activity: practice attempts, mock test history, and product interactions.
- Device or other IDs: Google Advertising ID / app-set or equivalent identifiers used by Google Mobile Ads.

Sharing:

- Supabase stores account/progress data for app functionality.
- Google Mobile Ads may collect and share advertising identifiers and ad interaction data under Google's SDK/data disclosure rules.

## Consent And Publisher Setup

Before enabling production ads:

- Publish and verify `https://kangalearner.com.au/app-ads.txt`.
- Configure Google UMP messages in AdMob/Ad Manager for EEA/UK/Swiss users.
- Verify non-personalized ad behavior when consent is denied or unavailable.
- Replace any sample iOS ad app/unit IDs before shipping iOS.
- Keep `EXPO_PUBLIC_KANGA_ADS_ENABLED=false` available as a kill switch.
