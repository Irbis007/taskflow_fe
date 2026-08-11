import { CardWrapper, Input, Switch } from "@shared/ui";

export function Security() {
  return (
    <div className="w-full">
      <div className="text-2xl">Security</div>
      <div className="text-secondary">Manage your password and access</div>
      <CardWrapper className="p-0 mt-5 w-full">
        <div className="p-4 border-b border-default">
          <div className="">Change password</div>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Current password</div>
          </div>
          <Input value="" onChange={() => {}} placeholder="Password" />
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">New password</div>
            <div className="text-muted text-sm">Min 8 characters</div>
          </div>
          <Input value="" onChange={() => {}} placeholder="New password" />
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="">
            <div className="">Confirm password</div>
          </div>
          <Input value="" onChange={() => {}} placeholder="Confirm password" />
        </div>
      </CardWrapper>
      <CardWrapper className="p-0 mt-5 w-full">
        <div className="p-4 border-b border-default">
          <div className="">Two-factor authentication</div>
          <div className="text-muted text-sm">
            Add an extra layer of security
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Add 2FA</div>
            <div className="text-muted text-sm">
              Use an authenticator app to verify login
            </div>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="">
            <div className="">Active session</div>
            <div className="text-muted text-sm">
              2 devices currently logged in
            </div>
          </div>
          <button className="px-4 py-2 border border-default rounded-lg bg-elevated cursor-pointer hover:bg-surface">
            Menage session
          </button>
        </div>
      </CardWrapper>
    </div>
  );
}
