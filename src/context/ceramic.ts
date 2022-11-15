import { createContext } from "react";
import { CeramicClient } from "@ceramicnetwork/http-client";

export type CeramicContextValue =
  | undefined
  | {
      init: Function;
      disconnect: Function;
      ceramic: CeramicClient | undefined;
    };

export const CeramicContext = createContext<CeramicContextValue>(undefined);
