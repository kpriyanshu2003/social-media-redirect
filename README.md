# Social Media Redirect

Adding one's social media links becomes a difficult job as one requires to go to individual social media links and copy the url each time required.

Instead, this express app aims to fix the issue of remembering URL of each social media profile. Just add them to JSON and have this app redirect to it when required.

# How to SetUp

## Setting up JSON

1. Create a JSON file of all your social media links in the following format:

```JSON
[
    {
        "keyword":"instagram",
        "url":"https://instagram.com/yourProfile"
    },
    {
        "keyword":"github",
        "url":"https://github.com/yourProfile"
    }
]
```

**NOTE :** Make sure keywords are in lowercase otherwise the app won't work

2. Make sure to deploy your JSON to a location from where it is accessible on the internet and, raw JSON can be accessed. One such service is [Npoint](https://www.npoint.io/).

## Setting up the app

**Prerequisites :** Node js shall be installed of version 18.x or higher.

1. Install required dependencies: `npm i`
2. Setup environment variables
   - `JSON_URL=URL_to_access_raw_JSON_data` (required)
   - `PORT=port` (optional) (default port 3000)
3. Start the server: `npm run start`

**If you want to contribute or make it your own**

1. Install `yarn`
2. Run `yarn --prod`. This will also install dev dependencies
3. Run `tsc -w` to transpile TS into JS

## Deployment

1. Using Docker: Run the command: `docker compose up`
2. Vercel:
   - Login in to vercel dashboard
   - Create `Add New..` > `Project`
   - Add environment variables as mentioned in the `Setting up the app` section
   - Hit `Deploy`
