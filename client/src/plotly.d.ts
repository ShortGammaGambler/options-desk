declare module "plotly.js-dist-min" {
  const Plotly: {
    newPlot: (el: HTMLElement, data: any[], layout?: any, config?: any) => void;
    purge: (el: HTMLElement) => void;
  };
  export default Plotly;
}
