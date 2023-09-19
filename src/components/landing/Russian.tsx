import { Button } from "../ui/button";

export default function Affiliate() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h3 className="flex-1 font-mono uppercase">Offers</h3>
        <Button className="font-mono" size={"sm"}>
          Hide Affiliate
        </Button>
      </div>
      <DealCard title="Axie Forever" />
      <DealCard title="League of Scam" price="2" />
      <DealCard title="CryptoPuppies" price="6" />
    </div>
  );
}

function DealCard({ title = "", price = "10" }) {
  return (
    <div className="border dark:border-slate-400 rounded-md p-4 flex flex-col gap-2">
      <div className="flex items-center">
        <h4 className="flex-1 ">{title}</h4>
        <p className="font-mono">$_</p>
      </div>
      <div className="flex items-center gap-2 uppercase">
        <div className="text-xs border border-yellow-500 rounded inline-block px-2 py-1 text-yellow-500">
          Spam
        </div>
        <div className="text-xs border border-slate-300 text-slate-300 rounded inline-block px-2 py-1">
          Affiliate
        </div>
      </div>
    </div>
  );
}
