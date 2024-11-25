# sf-demo

## Setup

Install NodeJs, run `npm install`. Afterwards, run tests using command:

```shell
npm run test
```

## Test reports

A report is generated after each test run. Serve it using command:

```shell
npx playwright show-report
```

## Slack notifications

When running tests in CI, a message will be sent to Slack channel.

If you want to trigger Slack notifications locally, create file `.env` in project root directory and add config:

```ini
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/xxx/xxx
```

Then trigger the tests with CI config:

```shell
npm run test:ci
```
