/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
import { startupFormSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { createPitchAction } from "@/app/server/actions";
import { useRouter } from "next/navigation";

const StartupForm = () => {
  const [error, setError] = useState<Record<string, string>>({});
  const [pitch, setPitch] = React.useState("");

  const { toast } = useToast();

  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        link: formData.get("link"),
        pitch,
      };

      await startupFormSchema.parseAsync(formValues);

      const result = await createPitchAction(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setError(fieldErrors as unknown as Record<string, string>);

        console.log("error", error);
        toast({
          title: "Error",
          description: "Please check the inputs in the form",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation Failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "Something went wrong",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          className="startup-form_input"
          id="title"
          type="text"
          name="title"
          placeholder="title"
          required
        />
        {error.title && <p className="startup-form_error">{error.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          className="startup-form_textarea"
          id="description"
          name="description"
          placeholder="description"
          required
        />
        {error.description && (
          <p className="startup-form_error">{error.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          className="startup-form_input"
          id="category"
          type="text"
          name="category"
          placeholder="category (e.g. blockchain)"
          required
        />
        {error.category && (
          <p className="startup-form_error">{error.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />

        {error.link && <p className="startup-form_error">{error.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          style={{ borderRadius: 20, overflow: "hidden" }}
          height={300}
          preview="edit"
          textareaProps={{
            placeholder:
              "Biefly describe your startup idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white-100"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit your Pitch"}
        <Send className="size-8 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
