"use client";

import { useActionState, useEffect } from "react";
import { createBlog } from "../../actions/blog";
import { useRouter } from "next/navigation";
import { useNotification } from "../../components/NotificationContext";
import InputContainer from "@/app/components/InputContainer";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    values: {
      title: "",
      author: "",
      url: "",
    },
    success: false,
  });

  const { showNotification } = useNotification();
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div>
      <h2 className="text-5xl mb-10 text-center">Add a new blog</h2>
      <form action={formAction} className="flex-col items-center">
        <InputContainer>
          <FieldLabel htmlFor="title" className="text-3xl">
            Title
          </FieldLabel>
          <Input
            type="text"
            name="title"
            defaultValue={state.values?.title}
            required
            id="title"
          />
        </InputContainer>
        <InputContainer>
          <FieldLabel htmlFor="author" className="text-3xl">
            Author
          </FieldLabel>
          <Input
            type="text"
            name="author"
            defaultValue={state.values?.author}
            required
            id="author"
          ></Input>
        </InputContainer>
        <InputContainer>
          <FieldLabel htmlFor="url" className="text-3xl">
            URL
          </FieldLabel>
          <Input
            type="text"
            name="url"
            defaultValue={state.values?.url}
            required
            id="url"
          ></Input>
        </InputContainer>
        {state.error && (
          <p aria-live="polite" className="text-red-700 mb-5">
            {state.error}
          </p>
        )}
        <Button
          type="submit"
          data-testid="create-blog-button"
          variant={"secondary"}
          size={"mySize"}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default NewBlog;
