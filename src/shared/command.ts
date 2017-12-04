import { SecretEntry, Identity } from "./model";

export interface PingCommand {
  command: 'ping'
}

export interface StatusCommand {
  command: 'status'
}

export interface LockCommand {
  command: 'lock'
}

export interface UnlockCommand {
  command: 'unlock'
  args: {
    name: string
    email: string
    passphrase: string
  }
}

export interface IdentitiesCommand {
  command: 'identities'
}

export interface ListCommand {
  command: 'list'
  args: {
    url?: string
    tag?: string
    name?: string
    type?: string
    deleted?: boolean
  }
}

export type Command = PingCommand | StatusCommand | LockCommand | UnlockCommand | IdentitiesCommand | ListCommand;

export interface CommandSender {
  send<R>(command: Command): Promise<R>
}