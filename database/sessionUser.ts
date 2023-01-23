import {DefaultUser} from "next-auth";

export type SessionUser = DefaultUser & { id: string };