import * as rudder from "rudder-sdk-js";
import { ENV } from "../global/const";

let RUDDERSTACK_WRITE_KEY: string;

// tab_url was logging user addresses in certain cases, so it is disabled
const DEFAULT_OPTS = { page: { tab_url: "" } };

if (ENV === "production") {
  RUDDERSTACK_WRITE_KEY = "2EzrNnUAfbX1NnxeCDZzbSVd0p9";
} else if (ENV === "staging") {
  RUDDERSTACK_WRITE_KEY = "2EzhYQgCELoWCA4pQbfhSXnE4HE";
}

export function rudderInitialize() {
  if (!RUDDERSTACK_WRITE_KEY) {
    return;
  }

  rudder.load(
    RUDDERSTACK_WRITE_KEY,
    "https://wherevernntiw.dataplane.rudderstack.com",
    {
      logLevel: ENV !== "production" ? "DEBUG" : undefined,
      integrations: { All: true },
    }
  );
}

class Analytics {
  initialize() {
    rudderInitialize();
  }

  identify(traits: {
    channelName: string;
    channelAddress: string;
    widgetVersion: string;
  }) {
    rudder.identify(traits, DEFAULT_OPTS);
  }

  track(event: string, args?: Record<string, any>) {
    rudder.track(event, args, DEFAULT_OPTS);
  }
}

const analytics = new Analytics();
export default analytics;
