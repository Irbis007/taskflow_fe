import QRCode from "qrcode";
import { $authHooks } from "@entities/auth";
import {
  Button,
  CardWrapper,
  Input,
  OutlinedButton,
  Overview,
  Spinner,
  Switch,
} from "@shared/ui";
import { useForm } from "@tanstack/react-form";
import { resetPasswordSchema } from "../schema";
import { showFieldErrors } from "@shared/utils";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@shared/libs";
import { useAuthStore } from "@shared/models";

export function Security() {
  const { mutateAsync, isPending } = $authHooks.useResetPassword();
  const { mutateAsync: setup2FA, isPending: is2FAPending } =
    $authHooks.setup2fa();

  const [otpauthUrl, setOtpauthUrl] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const [is2FAConnected, setIs2FAConnected] = useState(false);

  const user = useAuthStore((state) => state.user);

  console.log(user);

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit({ formApi, value }) {
      mutateAsync(value).then(() => formApi.reset());
    },
    validators: {
      onChange: resetPasswordSchema,
    },
  });

  useEffect(() => {
    if (!otpauthUrl) return;

    QRCode.toDataURL(otpauthUrl).then((url) => {
      setQrCode(url);
    });
  }, [otpauthUrl]);

  const [isSubmitted, setIsSubmitted] = useState(false);

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
          <form.Field
            name="currentPassword"
            children={(field) => (
              <Input
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="Password"
              />
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">New password</div>
            <div className="text-muted text-sm">Min 8 characters</div>
          </div>
          <form.Field
            name="newPassword"
            children={(field) => (
              <Input
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="Confirm password"
                error={showFieldErrors(field, isSubmitted)}
              />
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="">
            <div className="">Confirm password</div>
          </div>
          <form.Field
            name="confirmNewPassword"
            children={(field) => (
              <Input
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="Confirm password"
                error={showFieldErrors(field, isSubmitted)}
              />
            )}
          />
        </div>
        {
          <form.Subscribe
            selector={(state) => state.isDefaultValue}
            children={(isDirty) =>
              !isDirty && (
                <div className="flex items-center gap-4 p-4">
                  <Button
                    title="Change password"
                    onClick={() => {
                      form.handleSubmit();
                      setIsSubmitted(true);
                    }}
                    className="bg-accent rounded-lg px-3 py-2 w-50"
                    isLoading={isPending}
                  />
                  <OutlinedButton
                    onClick={() => form.reset()}
                    className="bg-elevated rounded-lg px-3 py-2 border border-default"
                    title="Cancel"
                  ></OutlinedButton>
                </div>
              )
            }
          />
        }
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
          <div className="flex items-center gap-2">
            {is2FAPending && <Spinner />}
            <Switch
              checked={is2FAConnected}
              setChecked={(val) => {
                setIs2FAConnected(val);
                if (val) {
                  setup2FA().then((res) => {
                    setOtpauthUrl(res.otpauthUrl);
                  });
                }
              }}
            />
          </div>
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
      {!!qrCode && (
        <TwoFactorAuthenticationModal qrCode={qrCode} setQrCode={setQrCode} />
      )}
    </div>
  );
}

const TwoFactorAuthenticationModal = ({
  qrCode,
  setQrCode,
}: {
  qrCode: string;
  setQrCode: (val: string | null) => void;
}) => {
  const { mutateAsync, isPending } = $authHooks.enable2fa();

  const [isQrScanned, setIsQrScanned] = useState(false);
  const [code, setCode] = useState("");
  const modelRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(modelRef, () => setQrCode(null));

  return (
    <Overview className="flex items-center justify-center">
      <CardWrapper className="max-w" ref={modelRef}>
        {!isQrScanned ? (
          <>
            <img src={qrCode} alt="2FA QR code" />
            <Button title="Continue" onClick={() => setIsQrScanned(true)} />
          </>
        ) : (
          <div className="space-y-2">
            <Input
              value={code}
              onChange={setCode}
              maxLength={6}
              label="Enter code"
              placeholder="_ _ _ _ _ _"
            />
            <div className="flex gap-2">
              <OutlinedButton
                title="Back"
                onClick={() => setIsQrScanned(false)}
              />
              <Button
                title="Send"
                isLoading={isPending}
                onClick={() => {
                  if (code.length === 6) {
                    mutateAsync({ code });
                  }
                }}
              />
            </div>
          </div>
        )}
      </CardWrapper>
    </Overview>
  );
};
