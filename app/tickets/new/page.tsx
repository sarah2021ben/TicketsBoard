"use client";
import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

// ⛔ Ne pas importer directement `react-simplemde-editor` ici
// car cela entraînerait un rendu côté serveur (SSR) de l'éditeur,
// ce qui n'est pas souhaitable pour un éditeur de texte riche.
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const page = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit new ticket</Button>
    </div>
  );
};

export default page;
