import { $projectHooks } from "@entities/project";
import { ProjectForm } from "./ProjectForm";

import { Project } from "@shared/models";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  defaultData: Project;
};

export const EditProjectForm = (props: Props) => {
  const { mutateAsync, isPending } = $projectHooks.editProject(
    props.defaultData.id,
  );
  return (
    <ProjectForm
      {...props}
      type="edit"
      onSubmit={mutateAsync}
      isLoading={isPending}
      // onSubmit={(prj) => navigate(`${URLS.projects.default}/${prj.id}`)}
    />
  );
};
