import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FAQ() {
  return (
    <Accordion type="multiple">
      <AccordionItem value="pricing">
        <AccordionTrigger>How much does Repbot cost?</AccordionTrigger>
        <AccordionContent>
          <p className="mb-3">
            Our goal is for Repbot to be completely free to use with no paid add
            ons or usage tiers. However, giving away stuff for free does not
            make for financial sustainability, and we want to make sure you can
            rely on Repbot to help you run your business for a long time.
          </p>
          <p className="mb-3">
            To that end, our plan for monetization (at the moment) is to sell
            anonymized, aggregate reports on the sponsorship industry to brands
            and other talent agencies based on the data that Repbot collects
            about the deals that come through the service.
          </p>
          <p className="mb-3">
            So, yes, this is another free product that plans on selling your
            data to advertisers 😮‍💨.
          </p>
          <p>
            ☝️ However, expand the next question to see how <i>you</i> can
            actually share in the profits that come from the sale of your data.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="coop">
        <AccordionTrigger>
          <span>
            What's with the <code className="inline-block">`.coop`</code>?
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <p className="mb-3">
            Right now, our top priority is building a tool that's useful for our
            membership. However, financial sustainability is our second highest
            priority so that you can rely on Repbot to help you build your
            business for a long time.
          </p>

          <p className="mb-3">
            To that end, our plan at the moment is to sell anonymized, aggregate
            reports on the sponsorship industry to brands and other talent
            agencies based on the data that Repbot collects about the deals that
            come through the service.
          </p>

          <p className="mb-3">
            So, yes, this is another free product that plans on selling your
            data to advertisers 😮‍💨.
          </p>

          <p>
            ☝️ However, expand the next question to see how *you* can actually
            gain some of the money that comes from the sale of your data.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
