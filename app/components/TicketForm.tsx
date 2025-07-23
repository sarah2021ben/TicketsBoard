"use client";
import { useState } from "react";
import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TiInfoOutline } from "react-icons/ti";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "@/app/validationsSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Ticket } from "@prisma/client";

// ⛔ Ne pas importer directement `react-simplemde-editor` ici
// car cela entraînerait un rendu côté serveur (SSR) de l'éditeur,
// ce qui n'est pas souhaitable pour un éditeur de texte riche.
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
// to avoid repeating the interface definition, you can use zod to define the schema and infer the type
/* interface TicketForm {
  title: string;
  description: string;
} */
type TicketFormData = z.infer<typeof ticketSchema>;
interface Props {
  ticket?: Ticket;
}

const TicketForm = ({ ticket }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (ticket) await axios.patch(`/api/tickets/${ticket.id}`, data);
      else await axios.post("/api/tickets", data);
      // Optionally, you can redirect or reset the form after successful submission
      router.push("/tickets");
      router.refresh(); // Refresh the tickets list after submission to avoid stale data (caching)
    } catch (error) {
      setIsSubmitting(false);
      setError("Error creating ticket");
      console.error("Error creating ticket:", error);
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Icon>
            <TiInfoOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={ticket?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={ticket?.description}
          render={({ field }) => (
            <SimpleMDE {...field} onChange={(value) => field.onChange(value)} />
          )}
        />
        <ErrorMessage>{errors?.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting} type="submit">
          {ticket ? "Update the ticket" : "Submit new ticket"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TicketForm;
