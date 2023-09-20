import { useEffect, useState, type FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

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
      <h3 className="font-mono text-xl uppercase">Try it out</h3>
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
        <div className="my-12">
          <RadioGroup defaultValue="mid">
            <CreatorOption header="Mid Sized" value="mid" />
            <CreatorOption header="Small Sized" value="small" />
            <CreatorOption header="Big time" value="big" />
          </RadioGroup>
        </div>

        <hr className="my-6 dark:border-slate-400" />
        <div className="flex items-center">
          <Input
            placeholder="What's your budget?"
            value={rate}
            onChange={(e) => setRate(parseInt(e.target.value))}
            type="number"
            name="rate"
            className="flex-1 rounded-l rounded-r-none py-6 text-xl focus-visible:ring-0"
          />
          <div className="h-full rounded-r px-3 py-3 text-base dark:bg-slate-600">
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

function CreatorOption({ value, header }: { value: string; header: string }) {
  return (
    <div className="flex items-start rounded-md border hover:cursor-pointer dark:border-slate-500">
      <div className="py-3 pl-4">
        <RadioGroupItem value={value} id={value} />
      </div>
      <label
        htmlFor={value}
        className="flex-1 px-4  py-3 pl-3 hover:cursor-pointer"
      >
        <div className=" text-xl">{header}</div>
      </label>
    </div>
  );
}
