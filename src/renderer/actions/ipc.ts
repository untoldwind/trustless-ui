import { ipcRenderer, Event } from "electron";
import { CommandSender, Command } from "../../shared/command";

class IpcCommandSender implements CommandSender {
  private counter: number = 1;

  send<R>(command: Command): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      const replyChannel = `command-response-${this.counter++}`
      ipcRenderer.once(replyChannel, (event : Event, args: {success?: R, error?: R}) => {
        if(args.success) {
            resolve(args.success);
        } else if(args.error) {
            reject(args.error);
        } else {
            reject();
        }
      })
      ipcRenderer.send('command', { replyChannel, command })
    })
  }
}

export const ipcCommandSender : CommandSender = new IpcCommandSender();