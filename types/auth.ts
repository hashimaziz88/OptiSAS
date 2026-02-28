export type LoginFieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export type ScenarioType = "shared" | "new-org" | "join-org";

export type RegisterFieldType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  tenantName?: string;
  invitationCode?: string;
  role?: string;
};
