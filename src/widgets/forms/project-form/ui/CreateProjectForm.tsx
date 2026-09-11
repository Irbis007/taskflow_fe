import { useNavigate } from "react-router-dom";
import { ProjectForm } from "./ProjectForm";
import { URLS } from "@shared/consts";
import { $projectHooks } from "@entities/project";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

export const CreateProjectForm = ({ isOpen, setIsOpen }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = $projectHooks.createProject();
  return (
    <ProjectForm
      type="create"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={(data) =>
        mutateAsync(data).then((prj) =>
          navigate(`${URLS.projects.default}/${prj.id}`),
        )
      }
      isLoading={isPending}
    />
  );
};
