import * as rudder from 'rudder-js';

let RUDDERSTACK_WRITE_KEY = '2EzhYQgCELoWCA4pQbfhSXnE4HE';
let initialized = false;

if (process.env.WHEREVER_ENV === 'production') {
  RUDDERSTACK_WRITE_KEY = '2EzrNnUAfbX1NnxeCDZzbSVd0p9';
} else if (process.env.WHEREVER_ENV === 'staging') {
  RUDDERSTACK_WRITE_KEY = '2EzhYQgCELoWCA4pQbfhSXnE4HE';
}

export function rudderInitialize() {
  if (!RUDDERSTACK_WRITE_KEY) {
    console.log('Dev env - no analytics');
    return;
  }

  rudder.ready(() => {
    console.log('rudder initialized');
    initialized = true;
  });
  rudder.load(RUDDERSTACK_WRITE_KEY, 'https://wherevernntiw.dataplane.rudderstack.com', {
    logLevel: process.env.WHEREVER_ENV !== 'production' && 'DEBUG',
    integrations: { All: true },
  });
}

class Analytics {
  disabled = false;

  constructor() {
    rudderInitialize();
  }

  identify(userAddress: string, traits: { channelName: string; channelAddress: string }) {
    if (!initialized || this.disabled) return;
    rudder.identify(userAddress, traits);
  }

  track(event: string, args?: Record<string, any>) {
    if (!initialized || this.disabled) return;
    rudder.track(event, args);
  }

  page(page: string) {
    if (!initialized || this.disabled) return;
    rudder.page(page);
  }

  disableAnalytics() {
    this.disabled = true;
  }
}

const analytics = new Analytics();
export default analytics;
