import { Command, CommandSender } from "../shared/command";
import { Writable, Readable } from "stream";

type QueuedCommand = {
  command: Command;
  resolve: (response: any) => void
  reject: (err: Error) => void
}

export class CommandDelegate implements CommandSender {
  private queue: Array<QueuedCommand> = [];
  private current: QueuedCommand | undefined;
  private currentBuffer: Buffer | null = null;
  private currentOffset: number = 0;

  constructor(private inStream: Readable, private outStream: Writable) {
    inStream.on('data', this.handleData.bind(this));
    inStream.on('error', this.handleError.bind(this));
  }

  send<R>(command: Command): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      this.queue.push({ command, resolve, reject });
      this.processQueue();
    });
  }

  private processQueue() {
    if (this.current) return;

    this.current = this.queue.shift();

    if (this.current) this.sendCommand(this.current.command);
  }

  private sendCommand(command: Command) {
    const msg = JSON.stringify(command);
    const buf = new Buffer(4 + msg.length);
    buf.writeUInt32LE(msg.length, 0);
    buf.write(msg, 4);

    this.outStream.write(buf);
  }

  private handleData(data: Buffer) {
    if (this.currentBuffer) {
      this.currentOffset += data.copy(this.currentBuffer, this.currentOffset);
    } else {
      const len = data.readUInt32LE(0);
      this.currentBuffer = new Buffer(len);
      this.currentOffset = data.copy(this.currentBuffer, 0, 4);
    }
    if (this.currentOffset >= this.currentBuffer.length) {
      this.current && this.current.resolve(JSON.parse(this.currentBuffer.toString())['response']);
      this.currentBuffer = null;
      this.current = undefined;
      this.processQueue();
    }
  }

  private handleError(err: Error) {
    let item: QueuedCommand | undefined;
    while ((item = this.queue.shift()) !== undefined) {
      item.reject(err);
    }
  }
}