###  3.3.1 2016-06-24
Update Splash Screen and Logo
Fixed invalid date when posting a new listing
Image related
- Image and Listing Deletion.
- Image viewer now closable
- Upload image in full resolution, display default low resolution
- disallow anonymous user to login when create a listing or chat.
Improve push notification
- New message counting badge
- New Listing push
Cosmetic
- Display image in detail page in flow instead of image-grid?
- Fix Android Notification Icon problem
- Show last message

TODO(xinbenlv): tide up the following release notes

- Release 1: MVP for Early Adopter
  - DONE Create, Save, Update, View, Sort a listing
  - DONE LogIn, LogOut, Password Reset
  - DONE Map Marker Listing Navigation
  - DONE Chat
  - DONE City and Zip Pipe
  - DONE Create chat from listing.
  - DONE Image picker
  - DONE Google Map on Detail Page
  - DONE Handle most frequent bad cases
    - DONE No login
    - DONE No internet connection
  - DONE Strip to production credentials
  - DONE Turn Off FB and LinkedIn Auth0 signin.
  - DONE Disable Web Upload Image, Stop nav-back after upload image failure.
    - DONE Add icon, splash screen, webpage icon
    - DONE Sanitize
    - DONE Publish on Android and iOS for beta testing.
  - Bugs
    - DONE Flash quit when adding picture
    - DONE Flash quit when registering
    - DONE Edit validation
- Release 2: MVP for Growth
  - DONE Make the detail page editable
  - DONE Show image full screen view.
  - DONE Push notification
     - DONE FCM registration
     - DONE Push for chat
  - DONE Facebook and LinkedIn Sign-In Callback Fixing
  - DONE Firebase event tracking
  - Bugs
     - DONE Already logged in, reload the page, and then try to 
     load a listing, starting a chat will cause nullpointer exception.

- Web Release
  - Web image picker in creation page (wrj@)

- Release 3: Prod
  - DONE Use a production database
  - DONE Update Splash Screen and Logo
  - Bug
    - DONE Invalid date when posting a new listing
  - DONE Image Related Features
    - DONE Image and Listing Deletion.
    - DONE Image viewer now closable
    - DONE Upload image in full resolution, display default low resolution
  - DONE disallow anonymous user to login when create a listing or chat.
    - Improve push notification
    - DONE New message counting badge
    - DONE(pending verification) New Listing push
  - Cosmetic
    - DONE Display image in detail page in flow instead of image-grid?
    - DONE Fix Android Notification Icon problem
    - DONE Show last message
