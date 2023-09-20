import { useEffect, useState, type FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

function validateRate(rate: number) {
  return rate;
}

export default function Negotiate() {
  const [loading, setLoading] = useState(false);

  const [rate, setRate] = useState(800);
  const [minRate, setMinRate] = useState([1000]);
  const [audienceSize, setAudienceSize] = useState([50000]);

  let timer: NodeJS.Timeout | undefined;
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const rate = formData.get("rate");
    if (rate) console.log(validateRate(parseInt(rate.toString()) || 0));

    timer = setTimeout(() => setLoading(false), 800);
  }
  useEffect(() => {
    return () => {
      setLoading(false);
      clearTimeout(timer);
    };
  }, []);
  return (
    <form className="flex flex-col gap-3" onSubmit={submit}>
      <h3 className="text-xl uppercase font-mono">Try it out</h3>
      <div className="max-w-lg">
        <div>
          <div>${minRate}</div>
          <Slider
            value={minRate}
            onValueChange={(e) => setMinRate(e)}
            min={100}
            max={10000}
            step={50}
          />
        </div>
        <div>
          <div>{audienceSize}</div>
          <Slider
            value={audienceSize}
            onValueChange={(e) => setAudienceSize(e)}
            min={5000}
            max={1000000}
            step={10000}
          />
        </div>

        <hr className="my-6 dark:border-slate-400" />
        <div className="flex items-center">
          <Input
            placeholder="What's your budget?"
            value={rate}
            onChange={(e) => setRate(parseInt(e.target.value))}
            type="number"
            name="rate"
            className="flex-1 rounded-l rounded-r-none text-xl py-6 focus-visible:ring-0"
          />
          <div className="dark:bg-slate-600 h-full px-3 rounded-r text-base py-3">
            $USD
          </div>
        </div>
      </div>
      <div>
        <Button loading={loading}>Submit Offer</Button>
      </div>
    </form>
  );
}
