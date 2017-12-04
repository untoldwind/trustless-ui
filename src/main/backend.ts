import { spawn } from "child_process";
import { CommandDelegate } from "./command-delegate";
import { ipcMain, Event } from "electron";
import { Command } from "../shared/command";

export function startBackend(): void {
  const process = spawn('/home/bjunglas/bin/trustless-native');

  const commandDelegate = new CommandDelegate(process.stdout, process.stdin);

  ipcMain.on('command', (event: Event, args: { replyChannel: string, command: Command }) => {
    commandDelegate.send(args.command).then((success) => {
      event.sender.send(args.replyChannel, { success });
    }, (error) => {
      event.sender.send(args.replyChannel, { error });
    })
  })
}

