import {
  useEffect,
  useState,
  type FormEvent,
  useReducer,
  useCallback,
} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { calculateRange } from "@/lib/calculateRange";

const profileDisplayName = {
  big: "Pepper",
  mid: "Stu",
  small: "Tanya",
} as const;

export default function Negotiate() {
  const [loading, setLoading] = useState(false);
  const [responseState, setResponseState] = useState(0);
  const [minRate, setMin] = useState(2300);
  const [acceptableRange, setRange] = useState<number[] | undefined>();
  const [profile, setProfile] = useState<CreatorSize>("mid");
  const [prevOffer, setPrevOffer] = useState<number | null>(null);

  let timer: NodeJS.Timeout | undefined;
  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      let status = 0;
      const formData = new FormData(e.target as HTMLFormElement);
      const currentOffer = parseInt(formData.get("offer")?.toString() || "0");
      setPrevOffer(currentOffer);
      const profile = formData.get("profile") as CreatorSize;
      setProfile(profile);
      const minRate = parseInt(formData.get("min")?.toString() || "0");
      console.log(minRate);
      const range =
        acceptableRange || calculateRange(currentOffer, minRate, profile);
      setRange(range);
      const offerAcceptable = currentOffer >= range[0];

      const previousState = responseState;

      let response = previousState;
      if (previousState < 0 && offerAcceptable) {
        response = 1;
      } else if (previousState > 0 && !offerAcceptable) {
        response = -1;
      } else if (Math.abs(previousState) == 1 && prevOffer) {
        console.log(previousState, prevOffer);
        // If previous offer
        if (currentOffer < prevOffer) {
          response -= 1;
        } else if (currentOffer > prevOffer) {
          response += 1;
        }
      } else if (prevOffer) {
        console.log(prevOffer, previousState);
        if (previousState == -3) {
        } else if (previousState == 3) {
          if (currentOffer < prevOffer) {
            response = 2;
          }
        } else {
          if (currentOffer < prevOffer) {
            response -= 1;
          }
        }
      } else if (previousState === 0) {
        if (offerAcceptable) {
          response = 1;
        } else {
          response = -1;
        }
      }

      timer = setTimeout(() => {
        setResponseState(response);
        setLoading(false);
      }, 500);
    },
    [prevOffer, acceptableRange, responseState],
  );
  useEffect(() => {
    return () => {
      setLoading(false);
      clearTimeout(timer);
    };
  }, []);
  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <div>
        <div className="mb-2 font-mono text-sm">Get Out of Bed Rate:</div>
        <div className="hidden gap-3 md:flex">
          <div>${minRate}</div>
          <Slider
            value={[minRate]}
            name="min"
            onValueChange={(val) => setMin(val[0])}
            min={100}
            max={10000}
            step={50}
          />
        </div>
        <div className="flex items-center md:hidden">
          <div className="h-full rounded-l px-3 py-3 text-base dark:bg-slate-600">
            $
          </div>
          <Input
            placeholder="Minimum rate"
            type="number"
            name="min"
            value={minRate.toString()}
            onChange={(e) => setMin(parseInt(e.target.value) || 0)}
            required
            className="flex-1 rounded-l-none rounded-r py-6 text-xl focus-visible:ring-0"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-mono text-sm">Creator Profile:</div>
        <div>
          <RadioGroup
            value={profile}
            name="profile"
            onValueChange={(val: CreatorSize) => setProfile(val)}
          >
            <CreatorOption
              header="TikTok Tanya"
              value="small"
              ytMetric="14K"
              tiktokMetric="61K"
            />
            <CreatorOption
              header="Streamin' Stu"
              value="mid"
              twitchMetric="306K"
              instagramMetric="506K"
            />
            <CreatorOption
              header="Podcast Pepper"
              value="big"
              ytMetric="1.2M"
              instagramMetric="634K"
            />
          </RadioGroup>
          <div className="mt-2 whitespace-normal text-xs text-slate-300">
            *This form simulates a back-and-forth negotiation experience. But in
            practice, we only prompt brands once after their initial offer is
            made.
          </div>
        </div>
      </div>

      <hr className="my-3 dark:border-slate-400" />
      <div className="font-mono text-xl">Make Me An Offer 👇</div>
      <div className="flex items-center">
        <div className="h-full rounded-l px-3 py-3 text-base dark:bg-slate-600">
          $
        </div>
        <Input
          placeholder="What's your budget?"
          type="number"
          name="offer"
          defaultValue={1200}
          required
          className="flex-1 rounded-l-none rounded-r py-6 text-xl focus-visible:ring-0"
        />
      </div>
      <div>
        <Button loading={loading}>Submit Offer</Button>
      </div>
      {!!responseState && (
        <div className="ml-auto mr-0 max-w-[90%] whitespace-normal rounded-md bg-slate-800 p-4 text-sm">
          <Response
            acceptableRange={acceptableRange}
            profileName={profileDisplayName[profile]}
            status={responseState}
          />
        </div>
      )}
    </form>
  );
}

export type CreatorSize = "small" | "mid" | "big";

function Response({
  profileName,
  acceptableRange,
  status,
}: {
  profileName: string;
  acceptableRange?: number[];
  status: number;
}) {
  if (!acceptableRange) return <div>Now that's an enticing deal 👍!</div>;
  switch (status) {
    case 1:
      return (
        <div>{`👋 Hey friend, that offer looks good. ${profileName} usually accepts deals of this type for $${acceptableRange[0]} to $${acceptableRange[1]}. This offer has a good chance of being accepted, but you may want to increase it to be more competitive.`}</div>
      );
    case -1:
      return (
        <div>{`👋 Hey friend, that offer is pretty low. ${profileName} usually accepts deals of this type for $${acceptableRange[0]} to $${acceptableRange[1]}. You can still submit this offer, but you may want to increase it to be more competitive.`}</div>
      );
    case 2:
      return <div>Harder to sell but in range</div>;
    case -2:
      return <div>Better but still too low</div>;
    case 3:
      return <div>Now that's a deal!</div>;
    case -3:
      return <div>Harder to sell and not in range</div>;
    default:
      console.log(status);
      return <div>Unhandled case</div>;
  }
}

function CreatorOption({
  value,
  header,
  ytMetric,
  tiktokMetric,
  instagramMetric,
  twitchMetric,
}: {
  value: CreatorSize;
  header: string;
  ytMetric?: string;
  tiktokMetric?: string;
  instagramMetric?: string;
  twitchMetric?: string;
}) {
  return (
    <div className="flex items-start rounded-md border transition-colors hover:cursor-pointer hover:bg-slate-800 dark:border-slate-500">
      <div className="py-3 pl-4">
        <RadioGroupItem value={value} id={value} />
      </div>
      <label
        htmlFor={value}
        className="flex-1 px-4 py-3 pl-3 hover:cursor-pointer"
      >
        <div className=" mb-1 text-xl">{header}</div>
        <div className="flex items-center gap-4 font-mono text-sm">
          {tiktokMetric && (
            <SocialMetric icon={<TikTokIcon />} metric={tiktokMetric} />
          )}
          {ytMetric && (
            <SocialMetric icon={<YoutubeIcon />} metric={ytMetric} />
          )}
          {twitchMetric && (
            <SocialMetric icon={<TwitchIcon />} metric={twitchMetric} />
          )}

          {instagramMetric && (
            <SocialMetric icon={<InstagramIcon />} metric={instagramMetric} />
          )}
        </div>
      </label>
    </div>
  );
}

function SocialMetric({
  metric,
  icon,
}: {
  metric: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span>{metric}</span>
    </div>
  );
}

function YoutubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        fill="currentColor"
        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
      <path
        fill="currentColor"
        d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
      />
    </svg>
  );
}

function TwitchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path
        fill="currentColor"
        d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
      <path
        fill="currentColor"
        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
      />
    </svg>
  );
}
