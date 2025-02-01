import React from "react";
import { SubHeading } from "../ui/typographt";
import { ArrowRight } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function ContactSide() {
  return (
    <div className="w-full space-y-8 justify-end items-start sticky top-10">
      <div className="space-y-8">
        <SubHeading className="">
          Drop your email, I&apos;ll get back to you at light speed{" "}
          <span className="inline-flex h-full">
            <ArrowRight className="size-8" strokeWidth={2} />
          </span>
        </SubHeading>
      </div>
      <div className="space-y-4">
        <Input
          className="md:text-base h-8 md:h-10 px-6 bg-background relative z-50"
          placeholder="Name"
        />
        <Input
          className="md:text-base h-8 md:h-10 px-6 bg-background relative z-50"
          placeholder="Email"
        />
        <Textarea
          className="md:text-base h-8 md:h-10 px-6 bg-background relative z-50 min-h-32"
          placeholder="Type your message..."
        />
        <Button className="md:text-base h-8 md:h-10 w-full [&_svg]:size-4 md:[&_svg]:size-6">
          Send Message <ArrowRight className="" />
        </Button>
      </div>
    </div>
  );
}

export default ContactSide;
