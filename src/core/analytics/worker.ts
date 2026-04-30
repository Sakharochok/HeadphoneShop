self.onmessage = (e) => {
    const result = e.data.reduce((sum: number, i: number) => sum + i, 0);
    self.postMessage(result);
};