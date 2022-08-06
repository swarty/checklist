export default (href: string) => {
  const offsetTop = (document.querySelector(`#${href}`) as HTMLElement)?.offsetTop ?? null;

  if (!offsetTop) {
    return;
  }

  window.scroll({
    top: offsetTop,
    behavior: 'smooth',
  });
};
