import { useMatch, useSearchParams } from "react-router-dom";
import { Center, Flex } from "@chakra-ui/react";
import LogRocket from "logrocket";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import {
  NotificationFeedProvider,
  NotificationFeed,
  WidgetMode,
} from "@wherever/react-notification-widget";
import { Loader, NotFound } from "../../components";
import { IS_PROD } from "../../global/consts";
import { useGetPartnerInfoQuery } from "./operations.generated";

const theme = {
  fontFamily: "Mulish, sans-serif",
  buttonTextColor: "#0D0B19",
  bellColor: "#968c8c",
  primaryColor: "#C8FF3E",
  backgroundColor: "#0D0B19",
};

export const Home = () => {
  const slug = useMatch({ path: "/channel/:slug", end: false })?.params?.slug;
  const posthog = usePostHog();
  const [searchParams] = useSearchParams();
  const discordToken = searchParams.get("discordToken") || "";
  const partnerKey = searchParams.get("partnerKey") || "";

  useEffect(() => {
    if (slug && IS_PROD) {
      LogRocket.track("channel slug", { slug });
      posthog?.group("channel slug", slug); // paid feature, will work when upgrading.
    }
  }, [slug, posthog]);

  const { loading, data } = useGetPartnerInfoQuery({
    skip: !slug || !!partnerKey.length,
    variables: { input: { slug } },
  });
  console.log(loading, data);

  if (!data?.partnerInfo.partnerApiKey && !partnerKey) {
    return (
      <Center paddingY={50} height={"100%"} width={"100%"}>
        {loading ? <Loader /> : <NotFound />}
      </Center>
    );
  }

  return (
    <Center paddingY={50} height={"100%"} width={"100%"}>
      {/*remove this img max-width hack*/}
      <Flex height={"100%"} justifyContent={"center"}>
        <NotificationFeedProvider
          isOpen
          theme={theme}
          disableAnalytics={
            import.meta.env.REACT_APP_VERCEL_ENV !== "production"
          }
          mode={WidgetMode.SubscribeOnly}
          partnerKey={data?.partnerInfo.partnerApiKey || partnerKey}
          discordToken={discordToken}
        >
          <NotificationFeed
            width={{ desktop: 500 }}
            maxHeight={{ desktop: "80vh" }}
          >
            <span />
          </NotificationFeed>
        </NotificationFeedProvider>
      </Flex>
    </Center>
  );
};
