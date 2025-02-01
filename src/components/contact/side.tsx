"use client";
import React, { FormEvent, useState, useTransition } from "react";
import { SubHeading } from "../ui/typographt";
import { ArrowRight, CheckCircle2, RefreshCcw } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { contactSubmission } from "@/features/mailer/contactSubmission";

function ContactSide() {
  const [pending, startTrans] = useTransition();
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(form.entries());

    return startTrans(() => {
      contactSubmission(formData as never).then(() => {
        setSuccess(true);
      });
    });
  };
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="name"
          className="md:text-base h-8 md:h-10 px-6 bg-background relative z-50"
          placeholder="Name"
          required
        />
        <Input
          name="email"
          type="email"
          className="md:text-base h-8 md:h-10 px-6 bg-background relative z-50"
          placeholder="Email"
          required
        />
        <Textarea
          name="message"
          className="md:text-base h-8 md:h-10 px-6 bg-background relative z-50 min-h-32"
          placeholder="Type your message..."
          required
        />
        <Button
          className="md:text-base h-8 md:h-10 w-full [&_svg]:size-4 md:[&_svg]:size-6"
          disabled={pending || success}
        >
          {success ? (
            <>
              <CheckCircle2 className="size-4" /> Successfully Sent...
            </>
          ) : pending ? (
            <>
              <RefreshCcw className="animate-spin size-4 stroke-white" />
            </>
          ) : (
            <>
              {" "}
              Send Message <ArrowRight className="" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

export default ContactSide;
