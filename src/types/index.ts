export interface ITransaction {
  id?: string;
  address: string | undefined;
  amount: string | undefined;
}

export type Submit = React.FormEvent<HTMLFormElement>;
