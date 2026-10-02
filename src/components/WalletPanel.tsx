"use client";

import { Panel, PanelHeader } from "@/components/protocol/PanelUI";
import { useDetectedWallets } from "@/hooks/useDetectedWallets";

export function WalletPanel() {
  const wallets = useDetectedWallets();

  return (
    <Panel className="p-5">
      <PanelHeader title="Wallets" meta="Wallet Standard" />
      <p className="mt-4 text-sm leading-6 text-muted">
        Detected in this browser through the Wallet Standard. Nuvex requests no signatures in this
        milestone, and a connected wallet is not a protocol account.
      </p>
      {wallets.length === 0 ? (
        <p className="mt-4 text-sm text-subtle">No Wallet Standard wallet is registered.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2 text-sm text-fg-soft">
          {wallets.map((wallet) => (
            <li key={`${wallet.name}-${wallet.version}`}>{wallet.name}</li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
