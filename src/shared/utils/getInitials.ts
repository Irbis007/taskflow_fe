export const getInitials = ({
  name,
  surname,
}: {
  name: string;
  surname: string;
}) => {
  return (
    name.charAt(0).toLocaleUpperCase() + surname.charAt(0).toLocaleUpperCase()
  );
};
