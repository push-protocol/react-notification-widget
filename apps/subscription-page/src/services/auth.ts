import "@rainbow-me/rainbowkit/styles.css";
import { mainnet, goerli, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

const { chains, provider } = configureChains(
  [mainnet, goerli],
  [alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_KEY || "" })]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new MetaMaskConnector({
      options: {},
      chains,
    }),
    new CoinbaseWalletConnector({
      options: { appName: "Wherever" },
    }),
  ],
  provider,
});

export { wagmiClient, chains };
