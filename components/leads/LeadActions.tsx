"use client";

import { Button } from "@/components/ui/button";

type Props = {
  mobile: string;
  email?: string;
};

export default function LeadActions({
  mobile,
  email,
}: Props) {
  const whatsappUrl = `https://wa.me/91${mobile}`;

  const phoneUrl = `tel:${mobile}`;

  const emailUrl = `mailto:${email ?? ""}`;

  return (
    <div className="grid grid-cols-3 gap-3">

      <Button
        onClick={() => window.open(phoneUrl)}
      >
        Call
      </Button>

      <Button
        onClick={() =>
          window.open(
            whatsappUrl,
            "_blank"
          )
        }
      >
        WhatsApp
      </Button>

      <Button
        onClick={() => window.open(emailUrl)}
      >
        Email
      </Button>

    </div>
  );
}