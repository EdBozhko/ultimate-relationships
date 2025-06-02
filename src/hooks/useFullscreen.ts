export const useFullscreen = () => {
  const isFullscreen = () =>
    document.fullscreenElement ||
    //@ts-expect-error: TypeScript’s type definitions for Document don’t include the non-standard webkitFullscreenElement property by default
    document.webkitFullscreenElement;

  const enterFullscreen = (element: HTMLElement = document.body) => {
    if (element.requestFullscreen) return element.requestFullscreen();
    //@ts-expect-error: TypeScript’s type definitions for Document don’t include the non-standard webkitFullscreenElement property by default
    if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen();
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) return document.exitFullscreen();
    //@ts-expect-error: TypeScript’s type definitions for Document don’t include the non-standard webkitFullscreenElement property by default
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  };

  const toggleFullscreen = () => {
    if (isFullscreen()) exitFullscreen();
    else enterFullscreen();
  };

  return { isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen };
};
