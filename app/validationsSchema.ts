import { z } from "zod";
export const ticketSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters" ),
});
export const patchTicketSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters" ).optional(),
  assignedUserId: z.string().min(1,"Assigned user ID must be a valid UUID").optional().nullable(),
});