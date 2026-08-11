import { Button, Textarea } from "@shared/ui";
import { useForm } from "@tanstack/react-form";
import { FiSend } from "react-icons/fi";

type Props = {
  onCreateComment: (data: { message: string }) => Promise<unknown>;
  loading?: boolean;
};
export function CreateComment({ onCreateComment, loading }: Props) {
  const form = useForm({
    defaultValues: {
      message: "",
    },
    onSubmit: ({ value }) => {
      onCreateComment(value).then(() => form.reset());
    },
  });

  return (
    <div className="flex gap-2 w-full border-t border-default py-2 px-4 bg-elevated">
      <form.Field
        name="message"
        children={(field) => (
          <Textarea
            value={field.state.value}
            onChange={field.handleChange}
            placeholder="Write a message"
            className="bg-surface w-full"
            containerClassName="w-full"
            hideLimit
          />
        )}
      />
      <Button
        onlyIcon
        icon={<FiSend />}
        className="min-w-10 p-2.5 py-3 block"
        onClick={() => {
          form.handleSubmit();
        }}
        isLoading={loading}
      />
    </div>
  );
}
