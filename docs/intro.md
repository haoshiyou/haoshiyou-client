# haoshiyou

Haoshiyou is a find roommate/housing tools and non-profit organization.
We help people not only post infomation on the wechat group, but we also post on the website.W

## History

We began from wechat commnication APP, and string from 40 people which is a number wechat initial capacity, and it become 500 people now.

## structure

1. client
    1. Ionic(Cordova + AngularJS)
    2. MySQL - database
    3. loopback3 (plan to upgrade to 4) using for prototype and modeling to cross language interface and RESTFul open API
    4. CloudImage(save image)
2. AI
    1. using TypeScript to extractor data using regex, (plan to use some ML in order to incrase success rate)
3. Bots
    1. add people into group automaticatlly
    2. manage group
    3. record group post and forward to post services
4. UI/UX