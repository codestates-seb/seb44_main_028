// WebSocketManager.ts
class WebSocketManager {
  private webSocket: WebSocket | null;
  private onMessageCallback: ((message: string) => void) | null;

  constructor() {
    this.webSocket = null;
    this.onMessageCallback = null;
  }

  public connect(): void {
    this.webSocket = new WebSocket('wss://playpack.shop/ws/chat');

    // this.webSocket.onopen = (): void => {
    //   console.log('WebSocket is connected.');
    // };

    this.webSocket.onclose = (): void => {
      console.log('WebSocket is closed.');
    };

    this.webSocket.onerror = (error: Event): void => {
      console.log('WebSocket encountered an error: ', error);
    };

    this.webSocket.onmessage = (event): void => {
      if (this.onMessageCallback) {
        const message = JSON.parse(event.data).content;
        this.onMessageCallback(message);
      }
    };
  }

  public disconnect(): void {
    if (this.webSocket) {
      this.webSocket.close();
      this.webSocket = null;
    }
  }

  public sendMessage(message: string): void {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(message);
    } else {
      console.error('Cannot send message because WebSocket is not open');
    }
  }

  public setOnMessageCallback(callback: (message: string) => void): void {
    this.onMessageCallback = callback;
  }
}

export default new WebSocketManager();
