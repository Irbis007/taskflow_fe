import { CardWrapper, Input, Select, Switch } from "@shared/ui";

export function Workspace() {
  return (
    <div className="w-full">
      <div className="text-2xl">Workspace</div>
      <div className="text-secondary">Manage your team workspace settings</div>
      <CardWrapper className="p-0 mt-5 w-full">
        <div className="p-4 border-b border-default">
          <div className="">General</div>
        </div>
        <div className="flex items-center gap-4 p-4 border-b border-default">
          <div className="grow">
            <div className="">Workspace name</div>
          </div>
          <Input value="" onChange={() => {}} placeholder="Workspace"/>
        </div>
        <div className="flex items-center gap-4 p-4 border-b border-default">
          <div className="grow">
            <div className="">Default language</div>
          </div>
          <Select title="English" onChange={() => []} options={[
            {
              label: 'English',
            },
            {
              label: 'Russian',
            },
          ]}/>
        </div>
        <div className="flex items-center gap-4 p-4 border-b border-default">
          <div className="grow">
            <div className="">Allow member invites</div>
            <div className="text-muted text-sm">Members can invite others to the workspace</div>
          </div>
          <Switch />
        </div>
        <div className="flex items-center gap-4 p-4">
          <button className="px-5 py-2 rounded-lg bg-accent text-white">Save changes</button>
        </div>
      </CardWrapper>
    </div>
  );
}
