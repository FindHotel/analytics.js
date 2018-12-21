/* eslint quote-props: off */
'use strict';

/*
 Add all integrations you want registered here.
 Integration repos: https://github.com/segment-integrations?utf8=%E2%9C%93&query=analytics.js
 Make sure the integrations added are also installed and saved in the package.json
 */
module.exports = {
  'findhotel': require('@segment/analytics.js-integration-segmentio'),
  'google-tag-manager': require('@segment/analytics.js-integration-google-tag-manager')
};
