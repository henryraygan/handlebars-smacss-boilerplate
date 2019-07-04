export const activeMenu = () => {
  const menu = document.getElementById('main-menu')
  if (menu) {
      const links = [...menu.querySelectorAll('a')]
      console.log(links)
      links.map(link => {
          console.log(link);
          if (link.pathname === window.location.pathname.slice(0,-1)) link.classList.add('active')
      })
  }
}
