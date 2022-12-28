import * as rudder from 'rudder-sdk-js';

let RUDDERSTACK_WRITE_KEY: string;

if (process.env.WHEREVER_ENV === 'production') {
  RUDDERSTACK_WRITE_KEY = '2EzrNnUAfbX1NnxeCDZzbSVd0p9';
} else if (process.env.WHEREVER_ENV === 'staging') {
  RUDDERSTACK_WRITE_KEY = '2EzhYQgCELoWCA4pQbfhSXnE4HE';
}

export function rudderInitialize() {
  if (!RUDDERSTACK_WRITE_KEY) {
    return;
  }

  rudder.load(RUDDERSTACK_WRITE_KEY, 'https://wherevernntiw.dataplane.rudderstack.com', {
    logLevel: process.env.WHEREVER_ENV !== 'production' ? 'DEBUG' : undefined,
    integrations: { All: true },
  });
}

class Analytics {
  initialize() {
    rudderInitialize();
  }

  identify(traits: { channelName: string; channelAddress: string; widgetVersion: string }) {
    rudder.identify(traits);
  }

  track(event: string, args?: Record<string, any>) {
    rudder.track(event, args);
  }

  page(page: string) {
    rudder.page(page);
  }
}

const analytics = new Analytics();
export default analytics;
