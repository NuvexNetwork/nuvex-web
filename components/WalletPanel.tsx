"use client";

import { useDetectedWallets } from "@/hooks/useDetectedWallets";

export function WalletPanel() {
  const wallets = useDetectedWallets();

  return (
    <section className="rounded-lg border border-stone-300 bg-white p-5">
      <h2 className="text-lg font-semibold">Wallets</h2>
      <p className="mt-2 text-sm leading-6 text-stone-600">
        Detected through the Wallet Standard. Nuvex does not request signatures in this milestone,
        and a connected wallet is not a protocol account.
      </p>
      {wallets.length === 0 ? (
        <p className="mt-4 text-sm text-stone-500">No Wallet Standard wallet is registered.</p>
      ) : (
        <ul className="mt-4 space-y-2 text-sm">
          {wallets.map((wallet) => (
            <li key={`${wallet.name}-${wallet.version}`}>{wallet.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
