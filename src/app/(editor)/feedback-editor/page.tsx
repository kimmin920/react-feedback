"use client";

import { PrismaClient, User } from "@prisma/client";
import { FormEvent, Suspense, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SuccessIcon from "./components/success-icon";
import FailIcon from "./components/fail-icon";

type FormStatusType = "PENDING" | "LOADING" | "SUCCESS" | "FAILED";

export default function FeedbackEditorPage() {
  const [status, setStatus] = useState<FormStatusType>("PENDING");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("LOADING");

    const formData = new FormData(e.currentTarget);
    const feedback = formData.get("feedback");

    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });

      if (response.ok) {
        setStatus("SUCCESS");
      } else {
        setStatus("FAILED");
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setTimeout(() => {
        setStatus("PENDING");
      }, 2000);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>

          <PopoverContent className="w-[340px] min-h-[197px] relative flex flex-col items-center justify-center p-2">
            {status === "SUCCESS" ? (
              <div className="w-full h-full flex flex-col items-center gap-y-2 justify-center">
                <SuccessIcon />
                {status === "SUCCESS" && (
                  <div className="flex flex-col items-center gap-y-1 justify-center">
                    <p>Your feedback has been received!</p>
                    <p>Thank you for your help.</p>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}

            {status === "FAILED" ? (
              <div className="w-full h-full flex flex-col items-center gap-y-2 justify-center">
                <FailIcon />

                {status === "FAILED" && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="break-word">Failed to submit feedback.</p>
                    <p> Please try again later. </p>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}

            {status === "PENDING" && (
              <form
                className="w-full flex-1 space-y-6 grid"
                onSubmit={handleSubmit}
              >
                <Textarea />

                <Button type="submit" className="justify-self-end">
                  Submit
                </Button>
              </form>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </Suspense>
  );
}
